'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  quizId: string;
  unitTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function QuizModal({
  quizId,
  unitTitle,
  questions,
  onComplete,
  onClose
}: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = questions[currentIdx];
  const selectedOpt = selectedAnswers[currentQ.id];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: index }));
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setQuizFinished(true);

      if (finalScore >= 70) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
      onComplete(finalScore);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#151c28] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1b2535] px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Evaluación Técnica & Normativa AutoCAD
            </span>
            <h3 className="text-base font-bold text-white">{unitTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-slate-800 transition"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pregunta {currentIdx + 1} de {questions.length}</span>
                <span className="font-mono text-cyan-400">
                  {Math.round(((currentIdx) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                {currentQ.cadRelated && (
                  <span className="text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                    AutoCAD & Normativa
                  </span>
                )}
                <h4 className="text-base font-semibold text-white leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = "border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600";

                  if (selectedOpt === idx) {
                    btnStyle = "border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500";
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-1 ring-emerald-500 font-semibold";
                    } else if (selectedOpt === idx) {
                      btnStyle = "border-red-500 bg-red-950/50 text-red-200 ring-1 ring-red-500";
                    } else {
                      btnStyle = "border-slate-800 bg-slate-900/40 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswerSubmitted && selectedOpt === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                  <span className="text-xs font-semibold text-cyan-400">💡 Explicación Técnica:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Award className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-white">¡Evaluación Finalizada!</h4>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Tus respuestas han sido evaluadas y tu calificación ha sido registrada permanentemente en el sistema de la Universidad Aztlán.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
                >
                  Volver al Módulo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!quizFinished && (
          <div className="bg-[#1b2535] px-6 py-4 border-t border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {selectedOpt === undefined ? "Selecciona una opción para continuar" : "Opción seleccionada"}
            </span>
            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === undefined}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-5 py-2 rounded-lg transition"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-5 py-2 rounded-lg transition flex items-center gap-1.5"
              >
                <span>{currentIdx + 1 < questions.length ? "Siguiente Pregunta" : "Ver Resultados"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
