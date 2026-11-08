'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { COURSE_UNITS, VIRTUAL_PRACTICES } from '@/lib/courseData';
import { getStudentProgress } from '@/lib/storage';
import { StudentProgress } from '@/lib/types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Terminal,
  ArrowRight,
  TrendingUp,
  Flame,
  FileCheck2,
  AlertCircle,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StudentProgress | null>(null);

  useEffect(() => {
    if (user) {
      const p = getStudentProgress(user.id);
      setProgress(p);
    }
  }, [user]);

  // Fallback demo progress if not logged in
  const activeProgress = progress || {
    userId: 'guest',
    units: {
      'unidad-1': { unitId: 'unidad-1', completed: true, score: 95, lastAccessed: new Date().toISOString() },
      'unidad-2': { unitId: 'unidad-2', completed: true, score: 90, lastAccessed: new Date().toISOString() },
    },
    practices: {
      'practica-1': { practiceId: 'practica-1', completed: true, score: 100, commandsUsed: ['UNITS', 'LIMITS', 'RECTANG'] },
      'practica-2': { practiceId: 'practica-2', completed: true, score: 90, commandsUsed: ['PLINE', 'OFFSET', 'TRIM'] },
    },
    quizScores: { 'quiz-1': 100, 'quiz-2': 80 },
    projectStatus: 'en_progreso',
    lastActive: new Date().toISOString()
  };

  // Calculate stats
  const completedUnitsCount = Object.values(activeProgress.units).filter(u => u.completed).length;
  const completedPracticesCount = Object.values(activeProgress.practices).filter(p => p.completed).length;
  const overallPercent = Math.round(
    ((completedUnitsCount / 6) * 0.4 + (completedPracticesCount / 6) * 0.4 + (activeProgress.projectStatus === 'evaluado' ? 0.2 : activeProgress.projectStatus === 'entregado' ? 0.15 : activeProgress.projectStatus === 'en_progreso' ? 0.05 : 0)) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 blueprint-grid">
      {/* 1. WELCOME & USER STATUS BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#131c28] via-[#172333] to-[#121c27] border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono border border-cyan-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Portal del Estudiante • Clave 1057</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {user ? `Bienvenido(a), ${user.name}` : 'Panel de Avance del Estudiante'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {user?.carrera || 'Ingeniería Industrial - Décimo Cuatrimestre'} • Matrícula: {user?.matricula || 'AZT-2026-DEMO'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-700">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-semibold">Progreso de Materia</span>
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{overallPercent}%</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-500 border-r-cyan-500 flex items-center justify-center font-bold text-xs text-white">
              {completedUnitsCount}/6
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Ruta Curricular de AutoCAD & Diseño de Plantas</span>
            <span className="text-cyan-400 font-mono">{overallPercent}% completado</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${Math.max(overallPercent, 8)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Unidades Aprobadas</span>
            <span className="text-xl font-bold text-white font-mono">{completedUnitsCount} de 6</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Prácticas Virtuales</span>
            <span className="text-xl font-bold text-white font-mono">{completedPracticesCount} de 6</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Proyecto Capstone</span>
            <span className="text-sm font-bold text-emerald-400 uppercase">
              {activeProgress.projectStatus.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Promedio Cuestionarios</span>
            <span className="text-xl font-bold text-white font-mono">
              {Object.values(activeProgress.quizScores).length > 0
                ? `${Math.round(
                    Object.values(activeProgress.quizScores).reduce((a, b) => a + b, 0) /
                      Object.values(activeProgress.quizScores).length
                  )}%`
                : 'Pendiente'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. UNITS MODULES GRID WITH DIRECT CAD INTEGRATION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Módulos de Aprendizaje con AutoCAD</h2>
            <p className="text-xs text-slate-400">
              Avanza unidad por unidad, completa las prácticas en el simulador CAD y aprueba las evaluaciones técnicas.
            </p>
          </div>
          <Link
            href="/laboratorio-cad"
            className="hidden sm:flex items-center gap-2 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Abrir Simulador Libre</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_UNITS.map(unit => {
            const unitProg = activeProgress.units[unit.id];
            const pracProg = activeProgress.practices[unit.practiceId];
            const isCompleted = unitProg?.completed || false;
            const quizScore = activeProgress.quizScores[unit.quizId];

            return (
              <div
                key={unit.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition ${
                  isCompleted
                    ? 'bg-[#121c27] border-emerald-800/80'
                    : 'bg-[#121924] border-slate-800 hover:border-cyan-500/50'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                      {unit.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completada
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Pendiente
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {unit.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {unit.description}
                  </p>

                  {/* CAD focus chip */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
                    <span className="text-cyan-400 font-mono font-semibold block">
                      AutoCAD {unit.cadLevel}:
                    </span>
                    <p className="text-slate-300 leading-normal line-clamp-2">
                      {unit.cadFocus}
                    </p>
                  </div>

                  {/* Practice & Quiz status indicators */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Práctica Virtual:</span>
                      <span className={pracProg?.completed ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                        {pracProg?.completed ? '✓ Resuelta (100%)' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Quiz Normativo:</span>
                      <span className={quizScore !== undefined ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                        {quizScore !== undefined ? `${quizScore} / 100 pts` : 'No presentado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between mt-4">
                  <Link
                    href={`/unidades/${unit.id}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Ver Contenido</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/laboratorio-cad?practica=${unit.practiceId}`}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1"
                  >
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>Lanzar CAD</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
