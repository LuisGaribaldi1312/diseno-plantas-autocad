'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { COURSE_UNITS } from '@/lib/courseData';
import { getStudentProgress, calculateStudentOverallPercent, syncProgressToRemote, forceStudentSync } from '@/lib/storage';
import { StudentProgress } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Terminal,
  ArrowRight,
  TrendingUp,
  Flame,
  FileCheck2,
  Lock,
  Layers,
  RefreshCw,
  Radio
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const p = getStudentProgress(user.id);
      setProgress(p);
      // Auto sync progress to cloud and teacher hub immediately
      syncProgressToRemote(user.id, p, 'Sincronización automática de avance del estudiante');
    }
  }, [user]);

  const handleForceSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    setSyncMsg(null);
    try {
      const res = await forceStudentSync(user.id);
      const updated = getStudentProgress(user.id);
      setProgress(updated);
      setSyncMsg(res.message);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setSyncMsg(null), 5000);
    } catch (e) {
      setSyncMsg('Avance guardado localmente.');
    } finally {
      setIsSyncing(false);
    }
  };

  const activeProgress = progress || {
    userId: 'guest',
    units: {},
    practices: {},
    quizScores: {},
    projectStatus: 'no_iniciado',
    lastActive: new Date().toISOString()
  };

  const completedUnitsCount = activeProgress.units ? Object.values(activeProgress.units).filter(u => u.completed).length : 0;
  const completedPracticesCount = activeProgress.practices ? Object.values(activeProgress.practices).filter(p => p.completed).length : 0;
  const overallPercent = calculateStudentOverallPercent(activeProgress);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-8 autocad-grid bg-[#0A0A0A]">
      {/* 1. WELCOME & USER STATUS BANNER (AutoCAD Red / Deep Charcoal) */}
      <div className="rounded-2xl bg-[#141414] border border-[#2D2D2D] p-6 sm:p-8 shadow-xl red-border-glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-[#FF4D5A] text-xs font-mono font-bold border border-red-800">
              <span className="w-2 h-2 rounded-full bg-[#E51020] animate-ping"></span>
              <span>Portal del Estudiante • Clave 1057</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {user ? `Bienvenido(a), ${user.name}` : 'Panel de Avance del Estudiante'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              {user?.carrera || 'Ingeniería Industrial - Décimo Cuatrimestre'} • Matrícula: <span className="font-mono text-white font-bold">{user?.matricula || 'AZT-2026-DEMO'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#1C1C1C] p-4 rounded-xl border border-[#333333]">
            <div className="text-right">
              <span className="text-xs text-neutral-400 block font-bold">Progreso de la Materia</span>
              <span className="text-3xl font-black text-[#E51020] font-mono">{overallPercent}%</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-[#2A2A2A] border-t-[#E51020] border-r-[#E51020] flex items-center justify-center font-bold text-xs text-white">
              {completedUnitsCount}/6
            </div>
          </div>
        </div>

        {/* Progress Bar in AutoCAD Red */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-neutral-400">
            <span>Ruta Curricular de AutoCAD & Diseño de Plantas</span>
            <span className="text-[#E51020] font-mono">{overallPercent}% completado</span>
          </div>
          <div className="w-full bg-[#202020] h-3 rounded-full overflow-hidden border border-[#333333]">
            <div
              className="bg-gradient-to-r from-[#E51020] to-[#FF4D5A] h-full transition-all duration-500"
              style={{ width: `${Math.max(overallPercent, 8)}%` }}
            />
          </div>

          {/* Sincronización en Tiempo Real al Docente */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-neutral-400">
                Sincronización P2P & Nube activa con el Docente
              </span>
            </div>

            <div className="flex items-center gap-2">
              {syncMsg && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-3 py-1.5 rounded-xl animate-in fade-in">
                  ✓ {syncMsg}
                </span>
              )}
              <button
                onClick={handleForceSync}
                disabled={isSyncing}
                className="flex items-center gap-2 bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-red-950/50 red-glow"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Transmitiendo...' : '🚀 Forzar Envío de mi Avance al Docente'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-950 text-[#E51020] border border-red-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-semibold">Unidades Aprobadas</span>
            <span className="text-xl font-bold text-white font-mono">{completedUnitsCount} de 6</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#1F1F1F] text-white border border-[#333333]">
            <Terminal className="w-6 h-6 text-[#E51020]" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-semibold">Prácticas Virtuales</span>
            <span className="text-xl font-bold text-white font-mono">{completedPracticesCount} de 6</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-4">
          <div className="p-3 rounded-lg bg-red-950 text-[#E51020] border border-red-800">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-semibold">Proyecto Capstone</span>
            <span className="text-sm font-bold text-white uppercase">
              {activeProgress.projectStatus.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center gap-4">
          <div className="p-3 rounded-lg bg-[#1F1F1F] text-white border border-[#333333]">
            <TrendingUp className="w-6 h-6 text-[#E51020]" />
          </div>
          <div>
            <span className="text-xs text-neutral-400 block font-semibold">Promedio Cuestionarios</span>
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
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Módulos de AutoCAD por Unidad</h2>
            <p className="text-xs text-neutral-400">
              Avanza unidad por unidad, completa las prácticas interactivas en el simulador CAD y aprueba las evaluaciones.
            </p>
          </div>
          <Link
            href="/laboratorio-cad"
            className="hidden sm:flex items-center gap-2 text-xs bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-4 py-2 rounded-lg transition shadow"
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
                    ? 'bg-[#151515] border-red-700/80 shadow-md'
                    : 'bg-[#141414] border-[#2A2A2A] hover:border-[#E51020]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-2.5 py-1 rounded shadow">
                      {unit.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-red-950 px-2.5 py-0.5 rounded-full border border-red-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E51020]" /> Completada
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-neutral-400 bg-[#222222] px-2 py-0.5 rounded">
                        Pendiente
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug">
                    {unit.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {unit.description}
                  </p>

                  {/* CAD focus chip */}
                  <div className="p-3 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] text-[11px] space-y-1">
                    <span className="text-[#E51020] font-mono font-bold block">
                      AutoCAD {unit.cadLevel}:
                    </span>
                    <p className="text-neutral-300 leading-normal line-clamp-2">
                      {unit.cadFocus}
                    </p>
                  </div>

                  {/* Practice & Quiz status indicators */}
                  <div className="space-y-1.5 pt-2 border-t border-[#262626] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Práctica Virtual:</span>
                      <span className={pracProg?.completed ? 'text-white font-bold' : 'text-neutral-500'}>
                        {pracProg?.completed ? '✓ Resuelta (100%)' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Quiz Normativo:</span>
                      <span className={quizScore !== undefined ? 'text-[#FF4D5A] font-bold' : 'text-neutral-500'}>
                        {quizScore !== undefined ? `${quizScore} / 100 pts` : 'No presentado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#262626] flex items-center justify-between mt-4">
                  <Link
                    href={`/unidades/${unit.id}`}
                    className="text-xs font-bold text-[#E51020] hover:text-white flex items-center gap-1"
                  >
                    <span>Ver Subtemas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/laboratorio-cad?practica=${unit.practiceId}`}
                    className="text-xs bg-[#222222] hover:bg-[#E51020] text-white px-3 py-1.5 rounded-lg border border-[#333333] flex items-center gap-1 transition"
                  >
                    <Terminal className="w-3 h-3 text-[#E51020]" />
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
