'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { COURSE_UNITS, COURSE_QUIZZES, VIRTUAL_PRACTICES } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import { updateStudentUnitProgress, updateStudentQuizScore } from '@/lib/storage';
import QuizModal from '@/components/QuizModal';
import {
  ArrowLeft,
  Terminal,
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  FileCheck2,
  HelpCircle,
  Play,
  Share2,
  Sliders
} from 'lucide-react';

export default function UnitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const unitId = params.id as string;

  const unit = COURSE_UNITS.find(u => u.id === unitId) || COURSE_UNITS[0];
  const practice = VIRTUAL_PRACTICES.find(p => p.id === unit.practiceId);
  const quizQuestions = COURSE_QUIZZES[unit.quizId] || [];

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [completedQuizScore, setCompletedQuizScore] = useState<number | null>(null);

  const handleQuizComplete = (score: number) => {
    setCompletedQuizScore(score);
    if (user) {
      updateStudentQuizScore(user.id, unit.quizId, score);
      if (score >= 60) {
        updateStudentUnitProgress(user.id, unit.id, true, score);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 blueprint-grid">
      {/* Navigation breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/laboratorio-cad?practica=${unit.practiceId}`}
            className="flex items-center gap-1.5 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-1.5 rounded-lg transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Simulador CAD de la Unidad</span>
          </Link>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-500 text-white font-semibold px-3 py-1.5 rounded-lg transition"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Presentar Quiz</span>
          </button>
        </div>
      </div>

      {/* Unit Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#121c27] via-[#162333] to-[#121c28] border border-slate-700/80 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-md border border-cyan-800">
            {unit.number}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
            Nivel: AutoCAD {unit.cadLevel}
          </span>
          {completedQuizScore !== null && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              ✓ Evaluado ({completedQuizScore}%)
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {unit.title}
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          {unit.description}
        </p>

        {/* CAD Focus Highlights */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
          <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> Enfoque Práctico de AutoCAD:
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {unit.cadFocus}
          </p>
        </div>
      </div>

      {/* Subtopics Detailed Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Contenido Temático Oficial y Aplicación CAD</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {unit.subtopics.length} temas del programa
          </span>
        </div>

        <div className="space-y-6">
          {unit.subtopics.map((st, index) => (
            <div
              key={st.id}
              className="rounded-2xl bg-[#131b26] border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 text-xs font-mono flex items-center justify-center border border-cyan-800">
                    {index + 1}
                  </span>
                  <span>{st.title}</span>
                </h3>
              </div>

              {/* Theory Content */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                <p>{st.content}</p>
              </div>

              {/* AutoCAD Specific Concept & Commands */}
              <div className="p-4 rounded-xl bg-[#0e1622] border border-slate-800 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> Concepto & Técnica en AutoCAD:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.autocadConcept}
                  </p>
                </div>

                {/* Commands Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400">Comandos clave:</span>
                  {st.autocadCommands.map(cmd => (
                    <span
                      key={cmd}
                      className="font-mono text-xs font-bold bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {cmd}
                    </span>
                  ))}
                </div>

                {/* Normative Reference */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-amber-300/90 font-mono">
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>Normas: {st.industrialNorms.join(' • ')}</span>
                </div>

                {/* Practical mini-challenge */}
                <div className="p-2.5 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">Ejercicio sugerido:</span>
                  <span>{st.practicalExercise}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Callout Card */}
      {practice && (
        <div className="rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border border-cyan-800/80 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Laboratorio Virtual Asociado
            </span>
            <h3 className="text-xl font-bold text-white">{practice.title}</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {practice.objective}
            </p>
            <div className="text-xs font-mono text-amber-300">
              📌 Entregable: {practice.deliverable}
            </div>
          </div>

          <Link
            href={`/laboratorio-cad?practica=${practice.id}`}
            className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-cyan-950/50"
          >
            <Terminal className="w-4 h-4" />
            <span>Iniciar Práctica en AutoCAD</span>
          </Link>
        </div>
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <QuizModal
          quizId={unit.quizId}
          unitTitle={unit.title}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
          onClose={() => setIsQuizOpen(false)}
        />
      )}
    </div>
  );
}
