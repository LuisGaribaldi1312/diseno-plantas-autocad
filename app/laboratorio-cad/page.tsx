'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VIRTUAL_PRACTICES } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import { updateStudentPracticeProgress } from '@/lib/storage';
import AutoCadSimulator from '@/components/AutoCadSimulator';
import {
  Terminal,
  Keyboard
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
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4 space-y-4 autocad-grid bg-[#0A0A0A]">
      {/* Top Header & Selector (AutoCAD Red & Black) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-4 rounded-2xl border border-[#2A2A2A] red-border-glow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E51020] flex items-center justify-center text-white font-black font-mono shadow-md">
            CAD
          </div>
          <div>
            <h1 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-tight">
              <span>Laboratorio Virtual de AutoCAD para Diseño de Plantas</span>
              <span className="text-[10px] bg-red-950 text-[#FF4D5A] px-2.5 py-0.5 rounded-full border border-red-800 font-mono font-bold">
                v2026.1 RED
              </span>
            </h1>
            <p className="text-xs text-neutral-400">
              Espacio interactivo 2D con comandos reales, bloques industriales ISA-5.1 y normas NOM/ISO.
            </p>
          </div>
        </div>

        {/* Practice Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-300 font-bold whitespace-nowrap">
            Misión / Práctica:
          </span>
          <select
            value={selectedPracticeId}
            onChange={e => setSelectedPracticeId(e.target.value)}
            className="bg-[#1C1C1C] text-white font-bold text-xs rounded-xl px-3.5 py-2 border border-[#333333] focus:outline-none focus:border-[#E51020]"
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
      <div className="h-[80vh] min-h-[680px] w-full">
        <AutoCadSimulator
          practice={activePractice}
          onPracticeComplete={handlePracticeComplete}
        />
      </div>

      {/* Quick AutoCAD Command Shortcuts Reference */}
      <div className="p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] text-xs space-y-3">
        <div className="flex items-center gap-2 font-black text-white uppercase tracking-tight">
          <Keyboard className="w-4 h-4 text-[#E51020]" />
          <span>Atajos de Teclado y Comandos Esenciales de AutoCAD en Diseño de Plantas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px] font-mono">
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-[#E51020] font-black block">F8: ORTHOMODE</span>
            <span className="text-neutral-400">Trazado a 90°</span>
          </div>
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-white font-black block">F3: OSNAP</span>
            <span className="text-neutral-400">Referencias a objetos</span>
          </div>
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-[#E51020] font-black block">F7: GRID</span>
            <span className="text-neutral-400">Rejilla de fondo</span>
          </div>
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-white font-black block">PL / L: LINE</span>
            <span className="text-neutral-400">Trazado perimetral</span>
          </div>
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-[#E51020] font-black block">O: OFFSET</span>
            <span className="text-neutral-400">Muros paralelos</span>
          </div>
          <div className="bg-[#1C1C1C] p-2.5 rounded-xl border border-[#2E2E2E]">
            <span className="text-white font-black block">B / I: BLOCK</span>
            <span className="text-neutral-400">Equipos y válvulas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CadLabPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-neutral-400 font-mono">Cargando Laboratorio CAD AutoCAD 2026...</div>}>
      <CadLabContent />
    </Suspense>
  );
}
