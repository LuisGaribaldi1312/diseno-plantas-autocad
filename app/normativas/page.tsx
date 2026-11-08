'use client';

import React from 'react';
import Link from 'next/link';
import { INDUSTRIAL_NORMS } from '@/lib/courseData';
import {
  Compass,
  Terminal,
  ArrowRight
} from 'lucide-react';

export default function NormativasPage() {
  const extendedNorms = [
    ...INDUSTRIAL_NORMS,
    {
      code: "NFPA 101",
      title: "Life Safety Code (Código de Seguridad Humana)",
      scope: "Anchos mínimos de pasillos de evacuación, distancias máximas de recorrido hacia salidas de emergencia (máximo 60m en edificios con rociadores), resistencia al fuego de muros perimetrales y puertas de vaivén con barra antipánico.",
      autocadRule: "Trazar rutas de evacuación en capa de seguridad con flechas continuas y verificar radio de alcance de salidas con DIST."
    },
    {
      code: "OSHA 1910.22 / 1910.144",
      title: "General Industry Walking-Working Surfaces & Safety Color Codes",
      scope: "Codificación cromática de riesgos industriales: Rojo (Peligro/Paro de emergencia/Contraincendio), Amarillo (Precaución/Pasillos de montacargas/Obstáculos físicos), Naranja (Partes peligrosas de maquinaria).",
      autocadRule: "Asignar capas de señalización de piso industrial con polilíneas de 100mm de espesor y colores RGB específicos."
    },
    {
      code: "ISO 128",
      title: "Principios generales de presentación en dibujos técnicos",
      scope: "Convención internacional para grosores de línea (0.18, 0.25, 0.35, 0.50, 0.70mm), líneas ocultas de trazos discontinuos, líneas de simetría y ejes de tubería.",
      autocadRule: "Configuración estricta de la tabla de plumillas monochrome.ctb para asignación de grosores automáticos al plotear a PDF."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 autocad-grid bg-[#0A0A0A]">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950 text-[#FF4D5A] text-xs font-mono font-bold border border-red-800">
          <Compass className="w-3.5 h-3.5" />
          <span>NORMATIVIDAD TÉCNICA APLICADA A PLANOS CAD</span>
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Compendio de Normas Oficiales e Internacionales
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
          Toda planta industrial desarrollada en el curso debe ajustarse a las normas de seguridad,
          simbología de ingeniería de procesos y representación gráfica en AutoCAD.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {extendedNorms.map(norm => (
          <div
            key={norm.code}
            className="rounded-2xl bg-[#141414] border border-[#262626] p-6 space-y-4 hover:border-[#E51020] transition duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-2.5 py-1 rounded shadow">
                  {norm.code}
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Obligatoria en Planos
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {norm.title}
              </h3>

              <div className="space-y-1.5 text-xs text-neutral-300 leading-relaxed">
                <p>
                  <strong className="text-white">Alcance de Ingeniería:</strong> {norm.scope}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1C1C1C] border border-[#2D2D2D] text-xs space-y-1">
                <span className="text-[#E51020] font-mono font-bold flex items-center gap-1.5 text-[11px]">
                  <Terminal className="w-3.5 h-3.5" /> Regla de Dibujo en AutoCAD:
                </span>
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  {norm.autocadRule}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
              <Link
                href="/laboratorio-cad"
                className="text-xs text-[#E51020] hover:text-white font-bold flex items-center gap-1 transition"
              >
                <span>Aplicar en el Simulador</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
