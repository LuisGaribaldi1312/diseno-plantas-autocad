'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { getStudentProgress, updateStudentProjectSubmission } from '@/lib/storage';
import {
  Award,
  CheckCircle2,
  FileCheck2,
  Terminal,
  ExternalLink,
  BookOpen,
  Send,
  Layers,
  AlertCircle
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 blueprint-grid">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#121c27] via-[#172333] to-[#121c27] border border-slate-700/80 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-md border border-amber-800">
            UNIDAD III • PROYECTO FINAL (60% EVALUACIÓN)
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
            Dossier Ejecutivo AutoCAD
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Proyecto Capstone: Diseño Integral de Planta Industrial
        </h1>

        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          El proyecto final integra la memoria técnica, catálogo de especificaciones, presupuesto de inversión y el paquete
          de planos ejecutivos trazados y maquetados en AutoCAD según las normativas oficiales vigentes.
        </p>
      </div>

      {/* Requerimientos del Entregable (Según Unidad III del programa oficial) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-cyan-400" />
          <span>Estructura Requerida del Proyecto (Programa Oficial Clave 1057)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">III.1 Reporte Documentado</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memoria descriptiva del proceso, justificación del tipo de distribución en planta adoptada (línea de producción, funcional o celular) y consideraciones de seguridad industrial e impacto ambiental.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">III.2 Presupuesto y Catálogo de Conceptos</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Estimación de inversión de capital fijo (CAPEX) y costos de operación (OPEX) cuantificados a partir de la extracción de datos (DATAEXTRACTION) del modelo de AutoCAD.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">III.3 Documento de Especificaciones Técnicas</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hojas de datos de equipos de proceso (bombas, tanques, intercambiadores, tuberías ASME B31.3) y especificaciones constructivas de la nave industrial.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131b26] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">III.4 Diagramas y Planos Ejecutivos (.DWG y PDF)</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Juego completo de planos: Plot Plan General (1:500), Layout Arquitectónico e Industrial (1:100), Diagrama P&ID bajo norma ISA-5.1 y Plano de Rutas de Evacuación (NOM-026-STPS).
            </p>
          </div>
        </div>
      </div>

      {/* Submission Card for the Student */}
      <div className="rounded-2xl bg-[#121924] border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Módulo de Entrega del Proyecto</h3>
              <p className="text-xs text-slate-400">
                Sube el enlace a tu repositorio de GitHub, Google Drive o OneDrive con los archivos .DWG y PDF.
              </p>
            </div>
          </div>

          {progress?.projectGrade !== undefined && (
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-semibold">Calificación Oficial</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                {progress.projectGrade} / 100
              </span>
            </div>
          )}
        </div>

        {feedbackMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              URL del Repositorio de Entrega (GitHub / Google Drive / OneDrive)
            </label>
            <input
              type="url"
              required
              value={projectUrl}
              onChange={e => setProjectUrl(e.target.value)}
              placeholder="https://github.com/tu-usuario/proyecto-diseno-plantas-aztlan"
              className="w-full bg-[#182230] border border-slate-700 rounded-xl px-4 py-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Resumen del Proyecto y Notas al Docente
            </label>
            <textarea
              rows={4}
              value={projectNotes}
              onChange={e => setProjectNotes(e.target.value)}
              placeholder="Describe el tipo de planta diseñada (ej. Planta de Envasado, Planta Química, Manufacturera), capacidad de producción y aspectos clave de los planos en AutoCAD..."
              className="w-full bg-[#182230] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              Estatus actual:{' '}
              <strong className="text-amber-400 uppercase">
                {progress?.projectStatus?.replace('_', ' ') || 'No entregado'}
              </strong>
            </span>

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-cyan-950/50 flex items-center gap-2"
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
