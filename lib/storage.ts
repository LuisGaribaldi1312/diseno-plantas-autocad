import { User, StudentProgress } from './types';
import { p2pManager } from './p2pSync';

export const DEFAULT_USERS: User[] = [
  {
    id: "admin-1",
    name: "Dr. Luis Garibaldi (Coordinador / Super Administrador)",
    email: "admin@aztlan.edu.mx",
    password: "Admin2026!",
    role: "admin",
    matricula: "DOC-2026-1057",
    carrera: "Ingeniería Industrial y de Sistemas",
    createdAt: "2026-11-01T08:00:00Z",
    lastLogin: "2026-11-08T10:00:00Z"
  },
  {
    id: "student-1",
    name: "Carlos Mendoza Silva",
    email: "estudiante@aztlan.edu.mx",
    password: "Alumno2026!",
    role: "student",
    matricula: "AZT-1057-0842",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-02T09:00:00Z",
    lastLogin: "2026-11-07T18:30:00Z"
  },
  {
    id: "student-2",
    name: "Mariana Morales Pantoja",
    email: "mariana.morales@aztlan.edu.mx",
    password: "Alumno2026!",
    role: "student",
    matricula: "AZT-1057-0915",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-02T09:15:00Z",
    lastLogin: "2026-11-06T14:20:00Z"
  },
  {
    id: "student-3",
    name: "Alejandro Ruiz Domínguez",
    email: "alejandro.ruiz@aztlan.edu.mx",
    password: "Alumno2026!",
    role: "student",
    matricula: "AZT-1057-0789",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-02T09:30:00Z",
    lastLogin: "2026-11-05T11:45:00Z"
  },
  {
    id: "student-jtorres",
    name: "J. Torres",
    email: "jtorres@aztlan.edu.mx",
    password: "jtorres",
    role: "student",
    matricula: "AZT-1057-0101",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T08:00:00Z"
  },
  {
    id: "student-xguevara",
    name: "X. Guevara",
    email: "xguevara@aztlan.edu.mx",
    password: "xguevara",
    role: "student",
    matricula: "AZT-1057-0102",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T08:00:00Z"
  },
  {
    id: "student-adominguez",
    name: "A. Domínguez",
    email: "adominguez@aztlan.edu.mx",
    password: "adominguez",
    role: "student",
    matricula: "AZT-1057-0103",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T08:00:00Z"
  }
];

export const INITIAL_PROGRESS: Record<string, StudentProgress> = {
  "student-1": {
    userId: "student-1",
    units: {
      "unidad-1": { unitId: "unidad-1", completed: true, score: 95, lastAccessed: "2026-11-05T10:30:00Z" },
      "unidad-2": { unitId: "unidad-2", completed: true, score: 90, lastAccessed: "2026-11-07T12:00:00Z" },
      "unidad-3": { unitId: "unidad-3", completed: false, score: 0, lastAccessed: "2026-11-07T12:15:00Z" }
    },
    practices: {
      "practica-1": { practiceId: "practica-1", completed: true, score: 100, completedAt: "2026-11-05T11:15:00Z", commandsUsed: ["UNITS", "LIMITS", "ZOOM", "RECTANG", "OFFSET", "TEXT"] },
      "practica-2": { practiceId: "practica-2", completed: true, score: 90, completedAt: "2026-11-07T13:40:00Z", commandsUsed: ["PLINE", "OFFSET", "TRIM", "FILLET", "ARRAYRECT", "HATCH"] }
    },
    quizScores: {
      "quiz-1": 100,
      "quiz-2": 80
    },
    projectStatus: "en_progreso",
    projectGrade: undefined,
    projectUrl: "https://github.com/aztlan-student/planta-quimica-final",
    projectNotes: "Avance del 60%: Layout 2D completo y diagrama P&ID en proceso.",
    lastActive: "2026-11-07T18:30:00Z"
  },
  "student-2": {
    userId: "student-2",
    units: {
      "unidad-1": { unitId: "unidad-1", completed: true, score: 100, lastAccessed: "2026-11-04T16:00:00Z" }
    },
    practices: {
      "practica-1": { practiceId: "practica-1", completed: true, score: 100, completedAt: "2026-11-04T16:45:00Z", commandsUsed: ["UNITS", "LIMITS", "ZOOM", "RECTANG", "OFFSET", "TEXT"] }
    },
    quizScores: {
      "quiz-1": 100
    },
    projectStatus: "no_iniciado",
    lastActive: "2026-11-06T14:20:00Z"
  },
  "student-3": {
    userId: "student-3",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    lastActive: "2026-11-05T11:45:00Z"
  }
};

const USERS_STORAGE_KEY = 'aztlan_plant_design_users_v1';
const PROGRESS_STORAGE_KEY = 'aztlan_plant_design_progress_v1';
const CURRENT_USER_KEY = 'aztlan_plant_design_current_user_v1';

export function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed: User[] = JSON.parse(raw);
    const existingEmails = new Set(parsed.map(u => u.email.toLowerCase().trim()));
    let hasUpdates = false;

    for (const defUser of DEFAULT_USERS) {
      if (!existingEmails.has(defUser.email.toLowerCase().trim())) {
        parsed.push(defUser);
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error("Error reading users from storage:", err);
    return DEFAULT_USERS;
  }
}

export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Error saving users to storage:", err);
  }
}

export function getAllProgress(): Record<string, StudentProgress> {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(INITIAL_PROGRESS));
      return INITIAL_PROGRESS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading progress from storage:", err);
    return INITIAL_PROGRESS;
  }
}

export function saveAllProgress(progress: Record<string, StudentProgress>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Error saving progress to storage:", err);
  }
}

export function getStudentProgress(userId: string): StudentProgress {
  const all = getAllProgress();
  if (all[userId]) return all[userId];
  const newProgress: StudentProgress = {
    userId,
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };
  all[userId] = newProgress;
  saveAllProgress(all);
  return newProgress;
}

export function syncProgressToRemote(userId: string, current: StudentProgress, summary?: string): void {
  if (typeof window === 'undefined') return;

  // 1. Broadcast via Real-time P2P WebRTC / BroadcastChannel
  try {
    p2pManager.broadcastProgress(current, summary);
  } catch (e) {
    console.warn('P2P sync notification error:', e);
  }

  // 2. Transmit to Cloud Sync API (/api/progress)
  try {
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, progress: current }),
      keepalive: true
    }).catch(err => console.warn('Cloud sync background error:', err));
  } catch (e) {}
}

export async function pullLatestRemoteProgress(): Promise<Record<string, StudentProgress>> {
  if (typeof window === 'undefined') return getAllProgress();
  try {
    const res = await fetch(`/api/progress?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.progress) {
        const local = getAllProgress();
        const merged: Record<string, StudentProgress> = { ...local };
        for (const [uid, remoteProg] of Object.entries(data.progress)) {
          const rProg = remoteProg as StudentProgress;
          const lProg = merged[uid];
          if (!lProg) {
            merged[uid] = rProg;
          } else {
            merged[uid] = {
              ...lProg,
              ...rProg,
              units: { ...lProg.units, ...rProg.units },
              practices: { ...lProg.practices, ...rProg.practices },
              quizScores: { ...lProg.quizScores, ...rProg.quizScores },
              projectStatus: rProg.projectStatus !== 'no_iniciado' ? rProg.projectStatus : lProg.projectStatus,
              projectGrade: rProg.projectGrade !== undefined ? rProg.projectGrade : lProg.projectGrade,
              projectUrl: rProg.projectUrl || lProg.projectUrl,
              projectNotes: rProg.projectNotes || lProg.projectNotes,
              lastActive: (new Date(rProg.lastActive || 0) > new Date(lProg.lastActive || 0)) ? rProg.lastActive : lProg.lastActive
            };
          }
        }
        saveAllProgress(merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn('Could not pull remote progress:', e);
  }
  return getAllProgress();
}

export function updateStudentUnitProgress(userId: string, unitId: string, completed: boolean, score: number): void {
  const all = getAllProgress();
  const current = all[userId] || {
    userId,
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };
  current.units[unitId] = {
    unitId,
    completed,
    score,
    lastAccessed: new Date().toISOString()
  };
  current.lastActive = new Date().toISOString();
  all[userId] = current;
  saveAllProgress(all);
  syncProgressToRemote(userId, current, `Completó el tema de ${unitId.toUpperCase()} con ${score}% de calificación`);
}

export function updateStudentPracticeProgress(
  userId: string,
  practiceId: string,
  score: number,
  commandsUsed: string[]
): void {
  const all = getAllProgress();
  const current = all[userId] || {
    userId,
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };
  current.practices[practiceId] = {
    practiceId,
    completed: true,
    score,
    completedAt: new Date().toISOString(),
    commandsUsed
  };
  current.lastActive = new Date().toISOString();
  all[userId] = current;
  saveAllProgress(all);
  syncProgressToRemote(userId, current, `Completó la práctica CAD ${practiceId.toUpperCase()} con ${score}% de calificación`);
}

export function updateStudentQuizScore(userId: string, quizId: string, score: number): void {
  const all = getAllProgress();
  const current = all[userId] || {
    userId,
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };
  current.quizScores[quizId] = score;
  current.lastActive = new Date().toISOString();
  all[userId] = current;
  saveAllProgress(all);
  syncProgressToRemote(userId, current, `Aprobó cuestionario técnico con ${score}% de calificación`);
}

export function updateStudentProjectSubmission(
  userId: string,
  projectUrl: string,
  projectNotes: string
): void {
  const all = getAllProgress();
  const current = all[userId] || {
    userId,
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };
  current.projectStatus = 'entregado';
  current.projectUrl = projectUrl;
  current.projectNotes = projectNotes;
  current.lastActive = new Date().toISOString();
  all[userId] = current;
  saveAllProgress(all);
  syncProgressToRemote(userId, current, `Entregó el Proyecto Final Capstone (URL: ${projectUrl})`);
}

export function gradeStudentProject(userId: string, grade: number): void {
  const all = getAllProgress();
  if (all[userId]) {
    all[userId].projectStatus = 'evaluado';
    all[userId].projectGrade = grade;
    all[userId].lastActive = new Date().toISOString();
    saveAllProgress(all);
    syncProgressToRemote(userId, all[userId], `Calificación asignada al Proyecto Final: ${grade}/100`);
  }
}

export function getStoredCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export function setStoredCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error("Error setting current user:", err);
  }
}
