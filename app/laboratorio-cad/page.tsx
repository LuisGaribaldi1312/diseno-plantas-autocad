'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VIRTUAL_PRACTICES } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import { updateStudentPracticeProgress } from '@/lib/storage';
import AutoCadSimulator from '@/components/AutoCadSimulator';
import {
  Terminal,
  Layers,
  Award,
  BookOpen,
  Keyboard,
  Info,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

function CadLabContent() {
  const searchParams = useSearchParams();
  const practiceId = searchParams.get('practica');
  const { user } = useAuth();

  const [selectedPracticeId, setSelectedPracticeId] = useState<string>(
    practiceId || 'practica-1'
  );

  useEffect(() => {
    if (practiceId) {
      setSelectedPracticeId(practiceId);
    }
  }, [practiceId]);

  const activePractice = VIRTUAL_PRACTICES.find(p => p.id === selectedPracticeId);

  const handlePracticeComplete = (score: number, commandsUsed: string[]) => {
    if (user && activePractice) {
      updateStudentPracticeProgress(user.id, activePractice.id, score, commandsUsed);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121924] p-4 rounded-xl border border-slate-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-bold font-mono">
            CAD
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Laboratorio Virtual de AutoCAD para Diseño de Plantas</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800 font-mono">
                v2026.1
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Espacio interactivo 2D con consola de comandos reales, bloques industriales ISA-5.1 y normas NOM/ISO.
            </p>
          </div>
        </div>

        {/* Practice Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">
            Misión / Práctica:
          </span>
          <select
            value={selectedPracticeId}
            onChange={e => setSelectedPracticeId(e.target.value)}
            className="bg-slate-800 text-cyan-300 font-semibold text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-500"
          >
            {VIRTUAL_PRACTICES.map(p => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Simulator Component */}
      <div className="h-[740px]">
        <AutoCadSimulator
          practice={activePractice}
          onPracticeComplete={handlePracticeComplete}
        />
      </div>

      {/* Quick AutoCAD Command Shortcuts Reference */}
      <div className="p-4 rounded-xl bg-[#121924] border border-slate-800 text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-white">
          <Keyboard className="w-4 h-4 text-cyan-400" />
          <span>Atajos de Teclado y Comandos Esenciales de AutoCAD en Diseño de Plantas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] font-mono">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-cyan-400 font-bold block">F8: ORTHOMODE</span>
            <span className="text-slate-400">Trazado a 90°</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-cyan-400 font-bold block">F3: OSNAP</span>
            <span className="text-slate-400">Referencias a objetos</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-cyan-400 font-bold block">F7: GRID</span>
            <span className="text-slate-400">Rejilla de fondo</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-amber-400 font-bold block">PL / L: LINE</span>
            <span className="text-slate-400">Trazado perimetral</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-amber-400 font-bold block">O: OFFSET</span>
            <span className="text-slate-400">Muros paralelos</span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-amber-400 font-bold block">B / I: BLOCK</span>
            <span className="text-slate-400">Equipos y válvulas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CadLabPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400 font-mono">Cargando Laboratorio CAD...</div>}>
      <CadLabContent />
    </Suspense>
  );
}
