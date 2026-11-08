'use client';

import React from 'react';
import Link from 'next/link';
import { COURSE_INFO, COURSE_UNITS, VIRTUAL_PRACTICES, INDUSTRIAL_NORMS } from '@/lib/courseData';
import { useAuth } from '@/lib/authContext';
import {
  Compass,
  Terminal,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  FileCheck2,
  Lock,
  Layers,
  ChevronRight,
  Flame,
  FileCode2,
  Cpu
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden autocad-grid bg-[#0A0A0A]">
      {/* 1. HERO SECTION (AutoCAD Red / Pitch Black / Crisp White) */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/70 border border-red-800 text-[#FF4D5A] text-xs font-mono font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E51020] animate-ping"></span>
              <span>UNIVERSIDAD AZTLÁN • DÉCIMO CUATRIMESTRE • CLAVE 1057</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
              Diseño de Plantas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E51020] via-[#FF3344] to-white">
                con AutoCAD 2026
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              Entorno académico oficial para la materia de <strong>Diseño de Plantas Industriales</strong>.
              Aprende y domina AutoCAD desde el trazado básico 2D hasta diagramas P&ID normativos (ISA-5.1),
              layout arquitectónico de naves y planos ejecutivos para construcción.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/laboratorio-cad"
                className="flex items-center gap-2 bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-red-950/60 text-sm transition transform hover:-translate-y-0.5 red-glow"
              >
                <Terminal className="w-4 h-4" />
                <span>Abrir Simulador AutoCAD</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#262626] text-white font-semibold px-6 py-3.5 rounded-xl border border-[#333333] text-sm transition"
              >
                <BookOpen className="w-4 h-4 text-[#E51020]" />
                <span>Explorar Unidades & Avances</span>
              </Link>
            </div>

            {/* Credenciales de Acceso */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs space-y-2">
              <div className="flex items-center justify-between text-white font-semibold">
                <span className="flex items-center gap-1.5 text-[#E51020]">
                  <Lock className="w-3.5 h-3.5" /> Credenciales del Portal:
                </span>
                <span className="text-[10px] bg-[#222222] px-2 py-0.5 rounded text-neutral-300 font-mono">
                  Sesión Requerida
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-[#1C1C1C] p-2.5 rounded border border-[#333333]">
                  <span className="text-[#E51020] font-bold block">Super Administrador:</span>
                  <span className="text-white">admin@aztlan.edu.mx</span>
                  <span className="text-neutral-500 block">Pass: Admin2026!</span>
                </div>
                <div className="bg-[#1C1C1C] p-2.5 rounded border border-[#333333]">
                  <span className="text-white font-bold block">Estudiante Demo:</span>
                  <span className="text-white">estudiante@aztlan.edu.mx</span>
                  <span className="text-neutral-500 block">Pass: Alumno2026!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero: AutoCAD Vector Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#333333] bg-[#121212] p-4 shadow-2xl relative red-border-glow">
              <div className="flex items-center justify-between pb-3 border-b border-[#262626] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E51020] animate-pulse"></span>
                  <span className="text-white font-bold">AutoCAD Vector Canvas</span>
                </div>
                <span className="text-[#E51020] text-[11px] font-bold">LAYOUT_AZTLAN.DWG</span>
              </div>

              {/* Vector SVG Blueprint */}
              <div className="h-64 sm:h-72 my-3 rounded-xl bg-[#080808] border border-[#222222] relative flex flex-col justify-center items-center p-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E51020_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <svg viewBox="0 0 400 240" className="w-full h-full z-10 text-white">
                  {/* Nave industrial perimetral en blanco */}
                  <rect x="30" y="30" width="340" height="180" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
                  <rect x="40" y="40" width="320" height="160" fill="none" stroke="#666666" strokeWidth="1" strokeDasharray="4 2" />

                  {/* Reactores en Rojo AutoCAD */}
                  <circle cx="120" cy="90" r="26" fill="rgba(229,16,32,0.15)" stroke="#E51020" strokeWidth="2" />
                  <text x="106" y="94" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">R-101</text>

                  <circle cx="200" cy="90" r="26" fill="rgba(229,16,32,0.15)" stroke="#E51020" strokeWidth="2" />
                  <text x="186" y="94" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">R-102</text>

                  {/* Tanques */}
                  <rect x="270" y="65" width="45" height="50" rx="4" fill="rgba(255,255,255,0.05)" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="276" y="94" fill="#E51020" fontSize="8" fontFamily="monospace" fontWeight="bold">TK-201</text>

                  {/* Tuberías en Rojo */}
                  <line x1="146" y1="90" x2="174" y2="90" stroke="#E51020" strokeWidth="2.5" />
                  <line x1="226" y1="90" x2="270" y2="90" stroke="#E51020" strokeWidth="2.5" />

                  {/* Instrumentación ISA 5.1 */}
                  <circle cx="120" cy="150" r="12" fill="#141414" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="108" y1="150" x2="132" y2="150" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="112" y="147" fill="#E51020" fontSize="7" fontFamily="monospace" fontWeight="bold">TIC</text>
                  <text x="114" y="157" fill="#FFFFFF" fontSize="7" fontFamily="monospace">101</text>

                  {/* Andenes */}
                  <rect x="80" y="200" width="50" height="15" fill="#E51020" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="160" y="200" width="50" height="15" fill="#E51020" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="86" y="210" fill="#FFFFFF" fontSize="7" fontWeight="bold">ANDÉN 1</text>
                  <text x="166" y="210" fill="#FFFFFF" fontSize="7" fontWeight="bold">ANDÉN 2</text>
                </svg>

                <div className="absolute bottom-2 right-2 bg-[#171717] text-[#FF4D5A] font-mono text-[10px] px-2.5 py-1 rounded-md border border-red-900">
                  Simulación Vectorial en Vivo
                </div>
              </div>

              {/* Stats pills */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-white pt-1">
                <div className="p-2.5 bg-[#171717] rounded-xl border border-[#282828]">
                  <span className="text-[#E51020] font-black block text-base">6</span>
                  <span className="text-[11px] text-neutral-400">Unidades Temario</span>
                </div>
                <div className="p-2.5 bg-[#171717] rounded-xl border border-[#282828]">
                  <span className="text-white font-black block text-base">6</span>
                  <span className="text-[11px] text-neutral-400">Prácticas CAD</span>
                </div>
                <div className="p-2.5 bg-[#171717] rounded-xl border border-[#282828]">
                  <span className="text-[#E51020] font-black block text-base">100%</span>
                  <span className="text-[11px] text-neutral-400">Normativas NOM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW & SYLLABUS CARDS (UNIDADES I a VI) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold text-[#E51020] uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded-full border border-red-900/60">
            PROGRAMA DE ESTUDIOS OFICIAL • UNIVERSIDAD AZTLÁN
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Estructura Curricular con Enfoque AutoCAD
          </h2>
          <p className="text-neutral-400 text-sm">
            Todas las unidades y subtemas del programa integran la metodología industrial con comandos,
            ejercicios prácticos de dibujo y normativas técnicas obligatorias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_UNITS.map(unit => (
            <div
              key={unit.id}
              className="rounded-2xl bg-[#141414] border border-[#282828] p-6 flex flex-col justify-between hover:border-[#E51020] transition duration-300 group hover:shadow-xl hover:shadow-red-950/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-2.5 py-1 rounded-md shadow">
                    {unit.number}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#202020] text-neutral-300 border border-[#333333]">
                    AutoCAD {unit.cadLevel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#E51020] transition">
                  {unit.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {unit.description}
                </p>

                {/* AutoCAD Focus callout */}
                <div className="p-3 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] text-xs space-y-1">
                  <span className="font-bold text-[#E51020] block font-mono text-[11px]">
                    🛠 Comandos & Herramientas:
                  </span>
                  <p className="text-neutral-300 text-[11px] leading-normal line-clamp-3">
                    {unit.cadFocus}
                  </p>
                </div>

                {/* Subtopics list preview */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    Subtemas de la Unidad ({unit.subtopics.length} temas desarrollados):
                  </span>
                  <ul className="text-xs text-neutral-300 space-y-1">
                    {unit.subtopics.slice(0, 3).map(st => (
                      <li key={st.id} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E51020]"></span>
                        <span className="truncate">{st.title}</span>
                      </li>
                    ))}
                    {unit.subtopics.length > 3 && (
                      <li className="text-[11px] text-neutral-500 italic pl-3">
                        + {unit.subtopics.length - 3} subtemas adicionales con ejercicios prácticos...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#262626] mt-6 flex items-center justify-between">
                <Link
                  href={`/unidades/${unit.id}`}
                  className="text-xs font-bold text-[#E51020] hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition"
                >
                  <span>Estudiar Temas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/laboratorio-cad?practica=${unit.practiceId}`}
                  className="text-xs bg-[#222222] hover:bg-[#E51020] text-white px-3 py-1.5 rounded-lg border border-[#333333] transition"
                >
                  Práctica Virtual
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EVALUATION CRITERIA & OFFICIAL INSTITUTIONAL DETAILS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#222222]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Criterios de Evaluación Oficiales */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#2D2D2D] space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950 text-[#E51020] border border-red-800">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Criterios de Evaluación y Acreditación</h3>
                <p className="text-xs text-neutral-400">Reglamento Oficial - Universidad Aztlán</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
                <CheckCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <span>
                  <strong>80% de Asistencia mínima</strong> en las sesiones establecidas conforme al calendario institucional.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
                <CheckCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <span>
                  <strong>60% Examen Final / Proyecto de Planta</strong> con entrega de planos ejecutivos en AutoCAD y memoria técnica.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
                <CheckCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <span>
                  <strong>20% Reportes escritos de visitas</strong> y observaciones de campo realizadas a plantas de diversos tipos.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
                <CheckCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <span>
                  <strong>10% Controles de lectura</strong> obligatorios señalados por el docente.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A]">
                <CheckCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
                <span>
                  <strong>10% Cuestionarios técnicos resueltos</strong> y prácticas virtuales de laboratorio CAD.
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-neutral-400 border-t border-[#262626]">
              <span>Calificación mínima aprobatoria: <strong className="text-white">6.0 / 10.0</strong></span>
              <span className="text-[#E51020] font-bold">Escala numérica 0 a 10</span>
            </div>
          </div>

          {/* Normativas Técnicas Obligatorias */}
          <div className="p-8 rounded-2xl bg-[#141414] border border-[#2D2D2D] space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1F1F1F] text-white border border-[#333333]">
                <Compass className="w-6 h-6 text-[#E51020]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Normativas Industriales Aplicadas</h3>
                <p className="text-xs text-neutral-400">Códigos y Estándares Nacionales e Internacionales</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {INDUSTRIAL_NORMS.slice(0, 4).map(norm => (
                <div key={norm.code} className="p-3 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] space-y-1">
                  <span className="font-mono font-bold text-[#E51020] text-[11px] block">{norm.code}</span>
                  <p className="text-white font-medium leading-tight">{norm.title}</p>
                  <p className="text-neutral-400 text-[11px] pt-1">{norm.autocadRule}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/normativas"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E1E1E] hover:bg-[#282828] text-white text-xs font-bold border border-[#333333] transition"
              >
                <span>Consultar Compendio Completo de Normativas</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E51020]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
