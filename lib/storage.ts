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
  },
  {
    id: "student-jgonzalez",
    name: "J. González",
    email: "jgonzalez@aztlan.edu.mx",
    password: "jgonzalez",
    role: "student",
    matricula: "AZT-1057-0104",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T22:00:00Z"
  },
  {
    id: "student-djimenez",
    name: "D. Jiménez",
    email: "djimenez@aztlan.edu.mx",
    password: "djimenez",
    role: "student",
    matricula: "AZT-1057-0105",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T22:00:00Z"
  },
  {
    id: "student-dmorales",
    name: "D. Morales",
    email: "dmorales@aztlan.edu.mx",
    password: "dmorales",
    role: "student",
    matricula: "AZT-1057-0106",
    carrera: "Ingeniería Industrial - 10° Cuatrimestre",
    createdAt: "2026-11-08T22:00:00Z"
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
    globalPercent: 35,
    lastActive: "2026-11-07T18:30:00Z"
  },
  "student-3": {
    userId: "student-3",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-05T11:45:00Z"
  },
  "student-jtorres": {
    userId: "student-jtorres",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T08:00:00Z"
  },
  "student-xguevara": {
    userId: "student-xguevara",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T08:00:00Z"
  },
  "student-adominguez": {
    userId: "student-adominguez",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T08:00:00Z"
  },
  "student-jgonzalez": {
    userId: "student-jgonzalez",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T22:00:00Z"
  },
  "student-djimenez": {
    userId: "student-djimenez",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T22:00:00Z"
  },
  "student-dmorales": {
    userId: "student-dmorales",
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: "no_iniciado",
    globalPercent: 0,
    lastActive: "2026-11-08T22:00:00Z"
  }
};

const USERS_STORAGE_KEY = 'aztlan_plant_design_users_v1';
const PROGRESS_STORAGE_KEY = 'aztlan_plant_design_progress_v1';
const CURRENT_USER_KEY = 'aztlan_plant_design_current_user_v1';
const DELETED_USERS_KEY = 'aztlan_deleted_users_v1';

export function getDeletedUserEmails(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function markUserAsDeletedLocally(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getDeletedUserEmails();
    const clean = email.toLowerCase().trim();
    if (!list.includes(clean)) {
      list.push(clean);
      localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(list));
    }
  } catch (e) {}
}

export function unmarkUserAsDeletedLocally(email: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getDeletedUserEmails().filter(e => e !== email.toLowerCase().trim());
    localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(list));
  } catch (e) {}
}

export function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  try {
    const deletedSet = new Set(getDeletedUserEmails());
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const filteredDefaults = DEFAULT_USERS.filter(u => !deletedSet.has(u.email.toLowerCase().trim()));
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredDefaults));
      return filteredDefaults;
    }
    const parsed: User[] = JSON.parse(raw);
    const existingEmails = new Set(parsed.map(u => u.email.toLowerCase().trim()));
    let hasUpdates = false;

    for (const defUser of DEFAULT_USERS) {
      const cleanEmail = defUser.email.toLowerCase().trim();
      if (!existingEmails.has(cleanEmail) && !deletedSet.has(cleanEmail)) {
        parsed.push(defUser);
        hasUpdates = true;
      }
    }

    const validUsers = parsed.filter(u => !deletedSet.has(u.email.toLowerCase().trim()));

    if (hasUpdates || validUsers.length !== parsed.length) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(validUsers));
    }
    return validUsers;
  } catch (err) {
    console.error("Error reading users from storage:", err);
    return DEFAULT_USERS;
  }
}

export async function fetchRemoteUsers(): Promise<User[]> {
  if (typeof window === 'undefined') return getStoredUsers();
  try {
    const res = await fetch(`/api/users?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.users)) {
        const deletedSet = new Set(getDeletedUserEmails());
        const valid = data.users.filter((u: User) => !deletedSet.has(u.email.toLowerCase().trim()));
        saveUsers(valid);
        return valid;
      }
    }
  } catch (e) {}
  return getStoredUsers();
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
    const parsed = JSON.parse(raw);
    let hasUpdates = false;
    for (const [uid, p] of Object.entries(INITIAL_PROGRESS)) {
      if (!parsed[uid]) {
        parsed[uid] = p;
        hasUpdates = true;
      }
    }
    if (hasUpdates) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
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

export function calculateStudentOverallPercent(p: StudentProgress): number {
  if (!p) return 0;
  const completedUnitsCount = p.units ? Object.values(p.units).filter(u => u.completed).length : 0;
  const completedPracticesCount = p.practices ? Object.values(p.practices).filter(pr => pr.completed).length : 0;
  
  let projectWeight = 0;
  if (p.projectStatus === 'evaluado') projectWeight = 0.20;
  else if (p.projectStatus === 'entregado') projectWeight = 0.15;
  else if (p.projectStatus === 'en_progreso') projectWeight = 0.05;

  const percent = Math.round(((completedUnitsCount / 6) * 0.40 + (completedPracticesCount / 6) * 0.40 + projectWeight) * 100);
  return Math.min(100, Math.max(0, percent));
}

export function syncProgressToRemote(userId: string, current: StudentProgress, summary?: string): void {
  if (typeof window === 'undefined') return;

  current.globalPercent = calculateStudentOverallPercent(current);
  current.lastSyncedAt = new Date().toISOString();

  try {
    const all = getAllProgress();
    all[userId] = current;
    saveAllProgress(all);
  } catch (e) {}

  // 1. Broadcast via Real-time P2P WebRTC / BroadcastChannel
  try {
    p2pManager.broadcastProgress(current, summary || `Avance actualizado al ${current.globalPercent}%`);
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

export async function forceStudentSync(userId: string): Promise<{ success: boolean; globalPercent: number; message: string }> {
  const current = getStudentProgress(userId);
  current.globalPercent = calculateStudentOverallPercent(current);
  current.lastSyncedAt = new Date().toISOString();
  current.lastActive = new Date().toISOString();
  
  const all = getAllProgress();
  all[userId] = current;
  saveAllProgress(all);

  // Broadcast P2P
  try {
    p2pManager.broadcastProgress(current, `Envío forzado de avance: ${current.globalPercent}%`);
  } catch (e) {}

  // Push to cloud API
  try {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, progress: current }),
      cache: 'no-store'
    });
    if (res.ok) {
      return {
        success: true,
        globalPercent: current.globalPercent,
        message: `¡Tu avance del ${current.globalPercent}% ha sido transmitido exitosamente al Docente en la nube y por P2P!`
      };
    }
  } catch (err) {}

  return {
    success: true,
    globalPercent: current.globalPercent,
    message: `¡Avance registrado localmente y transmitido vía P2P (${current.globalPercent}%)!`
  };
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
