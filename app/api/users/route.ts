import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import { DEFAULT_USERS } from '@/lib/storage';
import { User } from '@/lib/types';

const USERS_BLOB_PATH = 'data/aztlan_users_database.json';

let memoryUsers: User[] = [...DEFAULT_USERS];

async function loadCloudUsers(): Promise<User[]> {
  try {
    const { blobs } = await list({ prefix: USERS_BLOB_PATH });
    const match = blobs.find(b => b.pathname === USERS_BLOB_PATH);
    if (!match) return memoryUsers;

    const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return memoryUsers;

    const cloudUsers: User[] = await res.json();
    const existing = new Set(cloudUsers.map(u => u.email.toLowerCase().trim()));

    // Ensure default accounts exist
    for (const def of DEFAULT_USERS) {
      if (!existing.has(def.email.toLowerCase().trim())) {
        cloudUsers.push(def);
      }
    }
    memoryUsers = cloudUsers;
    return memoryUsers;
  } catch (err) {
    return memoryUsers;
  }
}

async function saveCloudUsers(users: User[]): Promise<boolean> {
  memoryUsers = users;
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      await put(USERS_BLOB_PATH, JSON.stringify(users, null, 2), {
        access: 'public',
        addRandomSuffix: false,
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
  const users = await loadCloudUsers();
  return NextResponse.json({
    success: true,
    users
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, users } = body;

    let current = await loadCloudUsers();

    if (Array.isArray(users)) {
      current = users;
    } else if (user) {
      const idx = current.findIndex(u => u.id === user.id || u.email === user.email);
      if (idx >= 0) {
        current[idx] = user;
      } else {
        current.push(user);
      }
    }

    await saveCloudUsers(current);

    return NextResponse.json({
      success: true,
      users: current
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
