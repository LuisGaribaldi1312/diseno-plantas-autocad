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
  CheckCircle2
} from 'lucide-react';

export default function PracticasPage() {
  const { user } = useAuth();
  const progress = user ? getStudentProgress(user.id) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 autocad-grid bg-[#0A0A0A]">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950 text-[#FF4D5A] text-xs font-mono font-bold border border-red-800">
          <Terminal className="w-3.5 h-3.5" />
          <span>PRÁCTICAS VIRTUALES DE LABORATORIO</span>
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Catálogo Oficial de Prácticas en AutoCAD
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          6 prácticas de dibujo técnico progresivas (desde configuración de plantilla hasta extracción cuantitativa de costos)
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
                  ? 'bg-[#151515] border-red-700/80 shadow-md'
                  : 'bg-[#141414] border-[#2A2A2A] hover:border-[#E51020]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-2.5 py-1 rounded shadow">
                    Práctica #{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#E51020]" /> {practice.estimatedMinutes} min
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#202020] text-neutral-300 border border-[#333333]">
                      {practice.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {practice.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {practice.objective}
                </p>

                {/* Normative & Commands */}
                <div className="p-3.5 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-[#FF6B76] font-mono text-[11px] font-bold">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>{practice.normativeReference}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {practice.commandsLearned.map(cmd => (
                      <span
                        key={cmd}
                        className="font-mono text-[10px] font-bold bg-[#262626] text-white px-2 py-0.5 rounded border border-[#3A3A3A]"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Steps count & deliverable */}
                <div className="text-xs text-neutral-400 space-y-1 pt-1">
                  <div>
                    <span className="font-bold text-white">Entregable:</span> {practice.deliverable}
                  </div>
                  <div>
                    <span className="font-bold text-white">Pasos guiados:</span> {practice.steps.length} misiones interactivas
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 border-t border-[#262626] flex items-center justify-between mt-4">
                {isDone ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Completada ({score}%)
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500 font-semibold">
                    Pendiente de realizar
                  </span>
                )}

                <Link
                  href={`/laboratorio-cad?practica=${practice.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold bg-[#E51020] hover:bg-[#C40816] text-white px-4 py-2.5 rounded-xl transition shadow-lg shadow-red-950/50"
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
