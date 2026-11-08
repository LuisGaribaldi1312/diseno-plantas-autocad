'use client';

import React from 'react';
import Link from 'next/link';
import { VIRTUAL_PRACTICES } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import { getStudentProgress } from '@/lib/storage';
import {
  FileCheck2,
  Terminal,
  Clock,
  Compass,
  ArrowRight,
  CheckCircle2,
  Layers,
  Award
} from 'lucide-react';

export default function PracticasPage() {
  const { user } = useAuth();
  const progress = user ? getStudentProgress(user.id) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 blueprint-grid">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono border border-cyan-800">
          <Terminal className="w-3.5 h-3.5" />
          <span>PRÁCTICAS VIRTUALES DE LABORATORIO</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Catálogo Oficial de Prácticas en AutoCAD
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          6 prácticas progresivas (desde configuración de plantilla hasta extracción de datos de costos)
          diseñadas para aplicar la teoría de diseño de plantas bajo normativas internacionales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VIRTUAL_PRACTICES.map((practice, index) => {
          const isDone = progress?.practices[practice.id]?.completed;
          const score = progress?.practices[practice.id]?.score;

          return (
            <div
              key={practice.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition ${
                isDone
                  ? 'bg-[#121c27] border-emerald-800/80'
                  : 'bg-[#121924] border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                    Práctica #{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {practice.estimatedMinutes} min
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      {practice.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">
                  {practice.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {practice.objective}
                </p>

                {/* Normative & Commands */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-300/90 font-mono text-[11px]">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>{practice.normativeReference}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {practice.commandsLearned.map(cmd => (
                      <span
                        key={cmd}
                        className="font-mono text-[10px] bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded border border-slate-700"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Steps count & deliverable */}
                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  <div>
                    <span className="font-semibold text-slate-300">Entregable:</span> {practice.deliverable}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-300">Pasos guiados:</span> {practice.steps.length} misiones
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between mt-4">
                {isDone ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Completada ({score}%)
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold">
                    Pendiente de realizar
                  </span>
                )}

                <Link
                  href={`/laboratorio-cad?practica=${practice.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition shadow-md shadow-cyan-950/40"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Revisar en CAD' : 'Comenzar Práctica'}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
