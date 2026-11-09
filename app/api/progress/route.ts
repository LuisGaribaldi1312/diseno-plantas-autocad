import { NextResponse } from 'next/server';
import { put, list, head } from '@vercel/blob';
import { INITIAL_PROGRESS } from '@/lib/storage';
import { StudentProgress } from '@/lib/types';

const PROGRESS_BLOB_PATH = 'data/aztlan_student_progress.json';

// In-memory cache for fast local/fallback operation
let memoryCacheProgress: Record<string, StudentProgress> = { ...INITIAL_PROGRESS };

async function getProgressBlobUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: PROGRESS_BLOB_PATH });
    const match = blobs.find(b => b.pathname === PROGRESS_BLOB_PATH);
    return match ? match.url : null;
  } catch (err) {
    console.warn('[Vercel Blob] List error or local mode fallback:', err);
    return null;
  }
}

async function loadCloudProgress(): Promise<Record<string, StudentProgress>> {
  try {
    const url = await getProgressBlobUrl();
    if (!url) {
      return memoryCacheProgress;
    }
    // Fetch latest JSON from blob with no-cache
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) {
      return memoryCacheProgress;
    }
    const data = await res.json();
    memoryCacheProgress = { ...INITIAL_PROGRESS, ...memoryCacheProgress, ...data };
    return memoryCacheProgress;
  } catch (err) {
    console.error('Error loading cloud progress:', err);
    return memoryCacheProgress;
  }
}

async function saveCloudProgress(data: Record<string, StudentProgress>): Promise<boolean> {
  memoryCacheProgress = { ...memoryCacheProgress, ...data };
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      await put(PROGRESS_BLOB_PATH, JSON.stringify(memoryCacheProgress, null, 2), {
        token,
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      });
      return true;
    }
  } catch (err) {
    console.error('Error saving to Vercel Blob:', err);
  }
  return false;
}

export async function GET() {
  const allProgress = await loadCloudProgress();
  return NextResponse.json({
    success: true,
    progress: allProgress,
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, progress, batch } = body;

    const current = await loadCloudProgress();

    if (batch && typeof batch === 'object') {
      // Merge batch of student progress records
      for (const [uid, p] of Object.entries(batch)) {
        current[uid] = p as StudentProgress;
      }
    } else if (userId && progress) {
      // Merge single student progress record
      current[userId] = progress as StudentProgress;
    } else {
      return NextResponse.json({ success: false, error: 'Invalid payload: userId and progress required' }, { status: 400 });
    }

    await saveCloudProgress(current);

    return NextResponse.json({
      success: true,
      message: 'Progreso sincronizado exitosamente en tiempo real',
      allProgress: current,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Error updating progress in API:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
