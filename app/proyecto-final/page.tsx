'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { getStudentProgress, updateStudentProjectSubmission } from '@/lib/storage';
import {
  Award,
  CheckCircle2,
  FileCheck2,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProyectoFinalPage() {
  const { user } = useAuth();
  const progress = user ? getStudentProgress(user.id) : null;

  const [projectUrl, setProjectUrl] = useState(progress?.projectUrl || '');
  const [projectNotes, setProjectNotes] = useState(progress?.projectNotes || '');
  const [submitted, setSubmitted] = useState(progress?.projectStatus === 'entregado' || progress?.projectStatus === 'evaluado');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectUrl.trim()) return;

    if (user) {
      updateStudentProjectSubmission(user.id, projectUrl, projectNotes);
      setSubmitted(true);
      setFeedbackMsg('¡Proyecto final registrado exitosamente para revisión docente!');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setFeedbackMsg('Por favor inicia sesión para entregar tu proyecto.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 autocad-grid bg-[#0A0A0A]">
      {/* Header (AutoCAD Red & Black) */}
      <div className="rounded-2xl bg-[#141414] border border-[#2D2D2D] p-6 sm:p-8 space-y-4 shadow-2xl red-border-glow">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-white bg-[#E51020] px-3 py-1 rounded-md shadow">
            UNIDAD III • PROYECTO FINAL (60% EVALUACIÓN)
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#222222] text-neutral-300 border border-[#333333]">
            Dossier Ejecutivo AutoCAD
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Proyecto Capstone: Diseño Integral de Planta Industrial
        </h1>

        <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
          El proyecto final integra la memoria técnica, catálogo presupuestal de conceptos, hojas de especificaciones técnicas y el paquete
          de planos ejecutivos trazados y maquetados en AutoCAD según las normativas oficiales vigentes.
        </p>
      </div>

      {/* Requerimientos del Entregable */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-white uppercase flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-[#E51020]" />
          <span>Estructura Requerida del Proyecto (Programa Oficial Clave 1057)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
            <span className="text-xs font-mono font-bold text-[#E51020]">III.1 Reporte Documentado</span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Memoria descriptiva del proceso, justificación del tipo de distribución en planta adoptada (línea de producción, funcional o celular) y consideraciones de seguridad industrial e impacto ambiental.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
            <span className="text-xs font-mono font-bold text-[#E51020]">III.2 Presupuesto y Catálogo de Conceptos</span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Estimación de inversión de capital fijo (CAPEX) y costos de operación (OPEX) cuantificados a partir de la extracción de datos (DATAEXTRACTION) del modelo de AutoCAD.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
            <span className="text-xs font-mono font-bold text-[#E51020]">III.3 Documento de Especificaciones Técnicas</span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Hojas de datos de equipos de proceso (bombas, tanques, intercambiadores, tuberías ASME B31.3) y especificaciones constructivas de la nave industrial.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
            <span className="text-xs font-mono font-bold text-[#E51020]">III.4 Diagramas y Planos Ejecutivos (.DWG y PDF)</span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Juego completo de planos: Plot Plan General (1:500), Layout Arquitectónico e Industrial (1:100), Diagrama P&ID bajo norma ISA-5.1 y Plano de Rutas de Evacuación (NOM-026-STPS).
            </p>
          </div>
        </div>
      </div>

      {/* Submission Card for the Student */}
      <div className="rounded-2xl bg-[#141414] border border-[#2A2A2A] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950 text-[#E51020] border border-red-800">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase">Módulo de Entrega del Proyecto</h3>
              <p className="text-xs text-neutral-400">
                Sube el enlace a tu repositorio de GitHub, Google Drive o OneDrive con los archivos .DWG y PDF.
              </p>
            </div>
          </div>

          {progress?.projectGrade !== undefined && (
            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block font-bold">Calificación Oficial</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {progress.projectGrade} / 100
              </span>
            </div>
          )}
        </div>

        {feedbackMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              URL del Repositorio de Entrega (GitHub / Google Drive / OneDrive)
            </label>
            <input
              type="url"
              required
              value={projectUrl}
              onChange={e => setProjectUrl(e.target.value)}
              placeholder="https://github.com/tu-usuario/proyecto-diseno-plantas-aztlan"
              className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-[#E51020]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">
              Resumen del Proyecto y Notas al Docente
            </label>
            <textarea
              rows={4}
              value={projectNotes}
              onChange={e => setProjectNotes(e.target.value)}
              placeholder="Describe el tipo de planta diseñada (ej. Planta de Envasado, Planta Química, Manufacturera), capacidad de producción y aspectos clave de los planos en AutoCAD..."
              className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E51020]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-neutral-400">
              Estatus actual:{' '}
              <strong className="text-[#E51020] uppercase font-bold">
                {progress?.projectStatus?.replace('_', ' ') || 'No entregado'}
              </strong>
            </span>

            <button
              type="submit"
              className="bg-[#E51020] hover:bg-[#C40816] text-white font-black px-7 py-3 rounded-xl text-xs transition shadow-lg shadow-red-950/60 flex items-center gap-2 red-glow uppercase"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? 'Actualizar Entrega' : 'Enviar Proyecto Final'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
