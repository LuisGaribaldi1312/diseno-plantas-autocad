import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { DEFAULT_USERS } from '@/lib/storage';
import { User } from '@/lib/types';

const USERS_BLOB_PATH = 'data/aztlan_users_database.json';

interface UsersPayload {
  users: User[];
  deletedEmails: string[];
}

let memoryState: UsersPayload = {
  users: [...DEFAULT_USERS],
  deletedEmails: []
};

async function loadCloudState(): Promise<UsersPayload> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const { blobs } = await list({ prefix: USERS_BLOB_PATH, token });
    const match = blobs.find(b => b.pathname === USERS_BLOB_PATH);
    if (!match) {
      await saveCloudState(memoryState);
      return memoryState;
    }

    const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return memoryState;

    const data = await res.json();
    let cloudUsers: User[] = Array.isArray(data) ? data : (data.users || []);
    let deletedEmails: string[] = Array.isArray(data.deletedEmails) ? data.deletedEmails : [];

    const deletedSet = new Set(deletedEmails.map((e: string) => e.toLowerCase().trim()));
    const existingEmails = new Set(cloudUsers.map(u => u.email.toLowerCase().trim()));

    // Only inject default accounts if never deleted and not currently in database
    let hasNew = false;
    for (const def of DEFAULT_USERS) {
      const cleanEmail = def.email.toLowerCase().trim();
      if (!existingEmails.has(cleanEmail) && !deletedSet.has(cleanEmail)) {
        cloudUsers.push(def);
        hasNew = true;
      }
    }

    memoryState = {
      users: cloudUsers,
      deletedEmails
    };

    if (hasNew) {
      await saveCloudState(memoryState);
    }

    return memoryState;
  } catch (err) {
    return memoryState;
  }
}

async function saveCloudState(state: UsersPayload): Promise<boolean> {
  memoryState = state;
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      await put(USERS_BLOB_PATH, JSON.stringify(state, null, 2), {
        token,
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      });
      return true;
    }
  } catch (err) {
    console.error('Error saving users to Vercel Blob:', err);
  }
  return false;
}

export async function GET() {
  const state = await loadCloudState();
  return NextResponse.json({
    success: true,
    users: state.users,
    count: state.users.length
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, user, users, userId, newPassword, email } = body;

    const state = await loadCloudState();

    if (action === 'delete' || body.deleteId) {
      const targetId = userId || body.deleteId;
      const targetUser = state.users.find(u => u.id === targetId || (email && u.email.toLowerCase() === email.toLowerCase()));
      
      if (targetUser) {
        const targetEmail = targetUser.email.toLowerCase().trim();
        if (targetEmail === 'admin@aztlan.edu.mx') {
          return NextResponse.json({ success: false, error: 'No es posible eliminar al Administrador Principal.' }, { status: 400 });
        }
        if (!state.deletedEmails.includes(targetEmail)) {
          state.deletedEmails.push(targetEmail);
        }
        state.users = state.users.filter(u => u.id !== targetUser.id);
      } else if (email) {
        const targetEmail = email.toLowerCase().trim();
        if (!state.deletedEmails.includes(targetEmail)) {
          state.deletedEmails.push(targetEmail);
        }
        state.users = state.users.filter(u => u.email.toLowerCase().trim() !== targetEmail);
      }

      await saveCloudState(state);
      return NextResponse.json({ success: true, message: 'Usuario eliminado permanentemente.', users: state.users });
    }

    if (action === 'updatePassword' && userId && newPassword) {
      const idx = state.users.findIndex(u => u.id === userId);
      if (idx >= 0) {
        state.users[idx].password = newPassword;
        await saveCloudState(state);
        return NextResponse.json({ success: true, message: 'Contraseña actualizada en la nube.', users: state.users });
      }
      return NextResponse.json({ success: false, error: 'Usuario no encontrado.' }, { status: 404 });
    }

    if (action === 'create' || user) {
      const candidate: User = user;
      const cleanEmail = candidate.email.toLowerCase().trim();

      // If email was previously marked as deleted, un-delete it
      state.deletedEmails = state.deletedEmails.filter(e => e.toLowerCase().trim() !== cleanEmail);

      const idx = state.users.findIndex(u => u.id === candidate.id || u.email.toLowerCase().trim() === cleanEmail);
      if (idx >= 0) {
        state.users[idx] = candidate;
      } else {
        state.users.unshift(candidate);
      }

      await saveCloudState(state);
      return NextResponse.json({ success: true, message: 'Usuario guardado permanentemente en la base de datos.', users: state.users, user: candidate });
    }

    if (Array.isArray(users)) {
      state.users = users;
      await saveCloudState(state);
      return NextResponse.json({ success: true, users: state.users });
    }

    return NextResponse.json({ success: true, users: state.users });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json({ success: false, error: 'id o email requeridos' }, { status: 400 });
    }

    const state = await loadCloudState();
    const targetUser = state.users.find(u => (userId && u.id === userId) || (email && u.email.toLowerCase() === email.toLowerCase()));

    if (targetUser) {
      const targetEmail = targetUser.email.toLowerCase().trim();
      if (targetEmail === 'admin@aztlan.edu.mx') {
        return NextResponse.json({ success: false, error: 'No es posible eliminar al Administrador Principal.' }, { status: 400 });
      }
      if (!state.deletedEmails.includes(targetEmail)) {
        state.deletedEmails.push(targetEmail);
      }
      state.users = state.users.filter(u => u.id !== targetUser.id);
      await saveCloudState(state);
      return NextResponse.json({ success: true, message: 'Usuario eliminado definitivamente.', users: state.users });
    }

    return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
