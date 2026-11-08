import { User, StudentProgress } from './types';

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
    return JSON.parse(raw);
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
}

export function gradeStudentProject(userId: string, grade: number): void {
  const all = getAllProgress();
  if (all[userId]) {
    all[userId].projectStatus = 'evaluado';
    all[userId].projectGrade = grade;
    saveAllProgress(all);
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
