'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
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
  Play,
  Sliders,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export default function UnitDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const unitId = params.id as string;

  const unit = COURSE_UNITS.find(u => u.id === unitId) || COURSE_UNITS[0];
  const practice = VIRTUAL_PRACTICES.find(p => p.id === unit.practiceId);
  const quizQuestions = COURSE_QUIZZES[unit.quizId] || [];

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [completedQuizScore, setCompletedQuizScore] = useState<number | null>(null);
  const [activeSubtopicTab, setActiveSubtopicTab] = useState<string>(unit.subtopics[0]?.id || '');

  const handleQuizComplete = (score: number) => {
    setCompletedQuizScore(score);
    if (user) {
      updateStudentQuizScore(user.id, unit.quizId, score);
      if (score >= 60) {
        updateStudentUnitProgress(user.id, unit.id, true, score);
      }
    }
  };

  const currentSubtopic = unit.subtopics.find(s => s.id === activeSubtopicTab) || unit.subtopics[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 autocad-grid bg-[#0A0A0A]">
      {/* Top Breadcrumb & Action Buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#E51020]" />
          <span>Volver al Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/laboratorio-cad?practica=${unit.practiceId}`}
            className="flex items-center gap-1.5 text-xs bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-3.5 py-2 rounded-xl transition shadow"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Simulador CAD de la Unidad</span>
          </Link>
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 text-xs bg-[#1C1C1C] hover:bg-[#282828] text-white font-bold px-3.5 py-2 rounded-xl border border-[#333333] transition"
          >
            <Award className="w-3.5 h-3.5 text-[#E51020]" />
            <span>Presentar Quiz ({quizQuestions.length} preguntas)</span>
          </button>
        </div>
      </div>

      {/* Unit Header Banner */}
      <div className="rounded-2xl bg-[#141414] border border-[#2E2E2E] p-6 sm:p-8 space-y-4 shadow-xl red-border-glow">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-3 py-1 rounded-md shadow">
            {unit.number}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#202020] text-neutral-300 border border-[#333333]">
            Nivel: AutoCAD {unit.cadLevel}
          </span>
          {completedQuizScore !== null && (
            <span className="text-xs font-bold text-white bg-red-950 px-2.5 py-0.5 rounded-full border border-red-700">
              ✓ Evaluado ({completedQuizScore}%)
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          {unit.title}
        </h1>

        <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
          {unit.description}
        </p>

        {/* CAD Focus Highlights */}
        <div className="p-4 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] space-y-1.5">
          <span className="text-xs font-mono font-bold text-[#E51020] flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> Enfoque Práctico de AutoCAD:
          </span>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {unit.cadFocus}
          </p>
        </div>
      </div>

      {/* Subtopics Interactive Tab Navigation */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#E51020]" />
            <span>Subtemas del Programa Oficial ({unit.subtopics.length} temas desarrollados)</span>
          </h2>
          <span className="text-xs text-neutral-500 font-mono">
            Selecciona un tema para estudiar a profundidad
          </span>
        </div>

        {/* Horizontal Subtopics Chips */}
        <div className="flex flex-wrap gap-2">
          {unit.subtopics.map((st, idx) => {
            const isActive = st.id === (currentSubtopic?.id || unit.subtopics[0].id);
            return (
              <button
                key={st.id}
                onClick={() => setActiveSubtopicTab(st.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#E51020] text-white border-[#E51020] shadow-md'
                    : 'bg-[#141414] text-neutral-400 hover:text-white border-[#2A2A2A] hover:bg-[#1C1C1C]'
                }`}
              >
                <span className="font-mono text-[11px]">{st.id}</span>
                <span className="truncate max-w-[200px] sm:max-w-xs">{st.title.split(' ')[1] || st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Subtopic Deep Dive Card */}
        {currentSubtopic && (
          <div className="rounded-2xl bg-[#141414] border border-[#282828] p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#E51020]">
                  Subtema Oficial {currentSubtopic.id}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {currentSubtopic.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {currentSubtopic.autocadCommands.map(cmd => (
                  <span
                    key={cmd}
                    className="font-mono text-xs font-bold bg-[#222222] text-[#FF4D5A] px-2 py-0.5 rounded border border-[#333333]"
                  >
                    {cmd}
                  </span>
                ))}
              </div>
            </div>

            {/* 1. Extended Theoretical Body */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                1. Fundamentación Teórica e Ingeniería
              </h4>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {currentSubtopic.content}
              </p>
            </div>

            {/* 2. Industrial Case Example */}
            <div className="p-4 rounded-xl bg-[#191919] border-l-4 border-l-[#E51020] border-y border-r border-[#2A2A2A] space-y-1">
              <span className="text-xs font-bold text-white block">
                🏭 Caso Práctico en la Industria:
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {currentSubtopic.industrialExample}
              </p>
            </div>

            {/* 3. AutoCAD Application & Technical Concept */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#E51020]" />
                <span>2. Aplicación y Técnica en AutoCAD</span>
              </h4>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {currentSubtopic.autocadConcept}
              </p>

              {/* Command Syntax Box */}
              <div className="p-3.5 rounded-xl bg-[#080808] border border-[#262626] font-mono text-xs space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase font-bold block">
                  Sintaxis en Línea de Comandos (AutoCAD Console):
                </span>
                <pre className="text-[#FF4D5A] whitespace-pre-wrap leading-relaxed font-mono text-xs">
                  {currentSubtopic.commandSyntax}
                </pre>
              </div>
            </div>

            {/* 4. Industrial Norms Associated */}
            <div className="p-3.5 rounded-xl bg-[#171717] border border-[#2D2D2D] flex flex-wrap items-center gap-3 text-xs">
              <span className="text-neutral-400 font-bold flex items-center gap-1">
                <Compass className="w-4 h-4 text-[#E51020]" />
                <span>Normas de Referencia:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {currentSubtopic.industrialNorms.map(norm => (
                  <span
                    key={norm}
                    className="font-mono text-[11px] bg-[#222222] text-white px-2 py-0.5 rounded border border-[#333333]"
                  >
                    {norm}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Guided Practical Exercise */}
            <div className="rounded-xl bg-[#181818] border border-[#2F2F2F] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E51020]" />
                  <span>Ejercicio Práctico Guiado: {currentSubtopic.practicalExercise.title}</span>
                </span>
                <Link
                  href={`/laboratorio-cad?practica=${unit.practiceId}`}
                  className="text-xs bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-3 py-1 rounded-lg transition shadow"
                >
                  Probar en Simulador
                </Link>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-300">
                <span className="font-semibold text-neutral-200 block">Instrucciones paso a paso:</span>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-neutral-300">
                  {currentSubtopic.practicalExercise.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0C0C0C] border border-[#242424] text-[11px] font-mono flex items-center justify-between">
                <span className="text-neutral-400">Entrada sugerida:</span>
                <span className="text-white font-bold">{currentSubtopic.practicalExercise.terminalInput}</span>
              </div>

              <div className="text-[11px] text-emerald-400 font-mono">
                ✓ Resultado esperado: {currentSubtopic.practicalExercise.expectedResult}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Practice Callout Card */}
      {practice && (
        <div className="rounded-2xl bg-[#141414] border border-[#E51020]/60 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl red-glow">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#E51020] uppercase tracking-wider">
              Laboratorio Virtual Asociado
            </span>
            <h3 className="text-xl font-black text-white uppercase">{practice.title}</h3>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              {practice.objective}
            </p>
            <div className="text-xs font-mono text-[#FF6B76]">
              📌 Entregable: {practice.deliverable}
            </div>
          </div>

          <Link
            href={`/laboratorio-cad?practica=${practice.id}`}
            className="shrink-0 flex items-center gap-2 bg-[#E51020] hover:bg-[#C40816] text-white font-black px-6 py-3.5 rounded-xl text-xs transition shadow-lg shadow-red-950/60 uppercase"
          >
            <Terminal className="w-4 h-4" />
            <span>Lanzar Práctica en AutoCAD</span>
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
