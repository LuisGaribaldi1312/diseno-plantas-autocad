export type Role = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Plain/hashed simulation for education portal
  role: Role;
  matricula: string;
  carrera: string;
  createdAt: string;
  lastLogin?: string;
}

export interface UnitProgress {
  unitId: string;
  completed: boolean;
  score: number; // 0 - 100
  lastAccessed: string;
}

export interface PracticeProgress {
  practiceId: string;
  completed: boolean;
  score: number;
  completedAt?: string;
  commandsUsed: string[];
}

export interface StudentProgress {
  userId: string;
  units: Record<string, UnitProgress>;
  practices: Record<string, PracticeProgress>;
  quizScores: Record<string, number>;
  projectStatus: 'no_iniciado' | 'en_progreso' | 'entregado' | 'evaluado';
  projectGrade?: number;
  projectUrl?: string;
  projectNotes?: string;
  lastActive: string;
}

export interface Subtopic {
  id: string;
  title: string;
  content: string;
  autocadConcept: string;
  autocadCommands: string[];
  industrialNorms: string[];
  practicalExercise: string;
}

export type CadLevel = 'Básico' | 'Básico - Intermedio' | 'Intermedio' | 'Intermedio - Avanzado' | 'Avanzado';

export interface Unit {
  id: string;
  number: string;
  title: string;
  description: string;
  cadLevel: CadLevel;
  cadFocus: string;
  subtopics: Subtopic[];
  practiceId: string;
  quizId: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  cadRelated: boolean;
}

export interface PracticeStep {
  stepNumber: number;
  instruction: string;
  cadCommand: string;
  expectedInput?: string;
  hint: string;
  validationKey: string;
}

export interface Practice {
  id: string;
  unitId: string;
  title: string;
  subtitle: string;
  level: CadLevel;
  estimatedMinutes: number;
  objective: string;
  normativeReference: string;
  commandsLearned: string[];
  steps: PracticeStep[];
  deliverable: string;
}
