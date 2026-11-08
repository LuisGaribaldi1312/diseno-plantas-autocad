'use client';

import React from 'react';
import Link from 'next/link';
import { COURSE_INFO, COURSE_UNITS, VIRTUAL_PRACTICES, INDUSTRIAL_NORMS } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import {
  Compass,
  Layers,
  Terminal,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  Cpu,
  Boxes,
  FileCheck2,
  Users,
  Lock,
  ChevronRight,
  Flame,
  Binary
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden blueprint-grid">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>UNIVERSIDAD AZTLÁN • DÉCIMO CUATRIMESTRE • CLAVE 1057</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ingeniería en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                Diseño de Plantas
              </span>
              <br />
              con AutoCAD Profesional
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Plataforma académica integral donde aprenderás a diseñar plantas industriales desde cero:
              del análisis técnico y económico hasta el trazado de layouts, diagramas P&ID normativos
              (ISA-5.1) y planos ejecutivos con <strong>AutoCAD básico, intermedio y avanzado</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/laboratorio-cad"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-900/40 text-sm transition transform hover:-translate-y-0.5"
              >
                <Terminal className="w-4 h-4" />
                <span>Abrir Simulador AutoCAD</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-700 text-sm transition"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Explorar Unidades & Avances</span>
              </Link>
            </div>

            {/* Quick Demo Access Credentials Card */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs space-y-2 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Lock className="w-3.5 h-3.5" /> Credenciales de Acceso al Portal:
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
                  Persistencia Activa
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <span className="text-amber-400 font-bold block">Super Administrador:</span>
                  <span className="text-slate-300">admin@aztlan.edu.mx</span>
                  <span className="text-slate-500 block">Pass: Admin2026!</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <span className="text-cyan-400 font-bold block">Estudiante Demo:</span>
                  <span className="text-slate-300">estudiante@aztlan.edu.mx</span>
                  <span className="text-slate-500 block">Pass: Alumno2026!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero: Interactive CAD Preview Display */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 via-[#111823] to-[#0c121a] p-4 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-300 font-semibold">AutoCAD Vector Preview</span>
                </div>
                <span className="text-cyan-400 text-[11px]">LAYOUT_FINAL.DWG</span>
              </div>

              {/* Simulated Drawing preview */}
              <div className="h-64 sm:h-72 my-3 rounded-lg bg-[#0e1622] border border-slate-800 relative flex flex-col justify-center items-center p-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* SVG Blueprint graphics */}
                <svg viewBox="0 0 400 240" className="w-full h-full z-10 text-cyan-400">
                  {/* Nave industrial perimetral */}
                  <rect x="30" y="30" width="340" height="180" fill="none" stroke="#eab308" strokeWidth="2.5" />
                  <rect x="40" y="40" width="320" height="160" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="4 2" />
                  
                  {/* Reactores */}
                  <circle cx="120" cy="90" r="26" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="2" />
                  <text x="106" y="94" fill="#06b6d4" fontSize="9" fontFamily="monospace" fontWeight="bold">R-101</text>
                  
                  <circle cx="200" cy="90" r="26" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" strokeWidth="2" />
                  <text x="186" y="94" fill="#06b6d4" fontSize="9" fontFamily="monospace" fontWeight="bold">R-102</text>

                  {/* Tanques */}
                  <rect x="270" y="65" width="45" height="50" rx="4" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="276" y="94" fill="#06b6d4" fontSize="8" fontFamily="monospace">TK-201</text>

                  {/* Tuberías */}
                  <line x1="146" y1="90" x2="174" y2="90" stroke="#22c55e" strokeWidth="2" />
                  <line x1="226" y1="90" x2="270" y2="90" stroke="#22c55e" strokeWidth="2" />

                  {/* Instrumentación ISA 5.1 */}
                  <circle cx="120" cy="150" r="12" fill="none" stroke="#ec4899" strokeWidth="1.5" />
                  <line x1="108" y1="150" x2="132" y2="150" stroke="#ec4899" strokeWidth="1" />
                  <text x="112" y="147" fill="#ec4899" fontSize="7" fontFamily="monospace">TIC</text>
                  <text x="114" y="157" fill="#ec4899" fontSize="7" fontFamily="monospace">101</text>

                  {/* Andenes */}
                  <rect x="80" y="200" width="50" height="15" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                  <rect x="160" y="200" width="50" height="15" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                  <text x="86" y="210" fill="#cbd5e1" fontSize="7">ANDÉN 1</text>
                  <text x="166" y="210" fill="#cbd5e1" fontSize="7">ANDÉN 2</text>
                </svg>

                <div className="absolute bottom-2 right-2 bg-slate-900/90 text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                  100% Interactivo en el Laboratorio
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-300 pt-1">
                <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/60">
                  <span className="text-cyan-400 font-bold block text-sm">6</span>
                  <span className="text-[11px] text-slate-400">Unidades Oficiales</span>
                </div>
                <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/60">
                  <span className="text-amber-400 font-bold block text-sm">6</span>
                  <span className="text-[11px] text-slate-400">Prácticas CAD</span>
                </div>
                <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/60">
                  <span className="text-emerald-400 font-bold block text-sm">100%</span>
                  <span className="text-[11px] text-slate-400">Normativas NOM/ISO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW & SYLLABUS CARDS (UNIDADES I a VI) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            PROGRAMA DE ESTUDIOS UNIVERSIDAD AZTLÁN
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Estructura Curricular con Enfoque AutoCAD
          </h2>
          <p className="text-slate-400 text-sm">
            Cada unidad del programa oficial integra la teoría de diseño de plantas industriales con comandos,
            herramientas prácticas de AutoCAD y normativas técnicas obligatorias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_UNITS.map(unit => (
            <div
              key={unit.id}
              className="rounded-2xl bg-gradient-to-b from-[#141d2a] to-[#0f1722] border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition duration-300 group hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/80">
                    {unit.number}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    CAD {unit.cadLevel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                  {unit.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {unit.description}
                </p>

                {/* AutoCAD Focus callout */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <span className="font-semibold text-cyan-400 block font-mono text-[11px]">
                    🛠 Comandos & Enfoque CAD:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-normal line-clamp-3">
                    {unit.cadFocus}
                  </p>
                </div>

                {/* Subtopics quick list */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Temas del Programa:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {unit.subtopics.slice(0, 3).map(st => (
                      <li key={st.id} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        <span className="truncate">{st.title}</span>
                      </li>
                    ))}
                    {unit.subtopics.length > 3 && (
                      <li className="text-[11px] text-slate-500 italic pl-3">
                        + {unit.subtopics.length - 3} temas adicionales...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                <Link
                  href={`/unidades/${unit.id}`}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition"
                >
                  <span>Estudiar Unidad</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/laboratorio-cad?practica=${unit.practiceId}`}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  Práctica Virtual
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EVALUATION CRITERIA & OFFICIAL INSTITUTIONAL DETAILS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Criterios Oficiales de Evaluación (Foto 2) */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#121a24] border border-slate-700 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Criterios de Evaluación y Acreditación</h3>
                <p className="text-xs text-slate-400">Reglamento Oficial - Universidad Aztlán</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>80% de Asistencia mínima</strong> en las sesiones establecidas conforme al calendario institucional.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>60% Examen Final / Proyecto de Diseño de Planta</strong> con entrega de planos ejecutivos en AutoCAD y reporte técnico.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>20% Reportes escritos de visitas</strong> y observaciones de campo realizadas a plantas de diversos tipos.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>10% Controles de lectura</strong> obligatorios señalados por el docente.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>10% Cuestionarios técnicos resueltos</strong> y prácticas virtuales de laboratorio CAD.
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800">
              <span>Calificación mínima aprobatoria: <strong>6.0 / 10.0</strong></span>
              <span className="text-cyan-400">Escala numérica 0 a 10</span>
            </div>
          </div>

          {/* Normativas Técnicas Obligatorias */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#121a24] border border-slate-700 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Normativas Industriales Aplicadas</h3>
                <p className="text-xs text-slate-400">Códigos y Estándares Nacionales e Internacionales</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {INDUSTRIAL_NORMS.slice(0, 4).map(norm => (
                <div key={norm.code} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                  <span className="font-mono font-bold text-cyan-400 text-[11px] block">{norm.code}</span>
                  <p className="text-slate-300 font-medium leading-tight">{norm.title}</p>
                  <p className="text-slate-400 text-[11px] pt-1">{norm.autocadRule}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/normativas"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition"
              >
                <span>Consultar Compendio Completo de Normativas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
