'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  quizId: string;
  unitTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function QuizModal({
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
          particleCount: 90,
          spread: 65,
          origin: { y: 0.6 }
        });
      }
      onComplete(finalScore);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#2D2D2D] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] red-border-glow">
        {/* Header */}
        <div className="bg-[#181818] px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold text-[#E51020] uppercase tracking-wider">
              Evaluación Técnica & Normativa AutoCAD
            </span>
            <h3 className="text-base font-bold text-white">{unitTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-sm px-2.5 py-1 rounded-lg hover:bg-[#252525] transition"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Pregunta {currentIdx + 1} de {questions.length}</span>
                <span className="font-mono text-[#E51020] font-bold">
                  {Math.round(((currentIdx) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#E51020] h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="space-y-2">
                {currentQ.cadRelated && (
                  <span className="text-[10px] font-mono uppercase bg-red-950 text-[#FF4D5A] border border-red-800 px-2 py-0.5 rounded font-bold">
                    AutoCAD & Normativa Oficial
                  </span>
                )}
                <h4 className="text-base font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = "border-[#2A2A2A] bg-[#1A1A1A] text-neutral-200 hover:bg-[#222222] hover:border-neutral-500";

                  if (selectedOpt === idx) {
                    btnStyle = "border-[#E51020] bg-red-950/40 text-white ring-1 ring-[#E51020]";
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "border-emerald-500 bg-emerald-950/60 text-white ring-1 ring-emerald-500 font-bold";
                    } else if (selectedOpt === idx) {
                      btnStyle = "border-red-600 bg-red-950/70 text-red-200 ring-1 ring-red-600";
                    } else {
                      btnStyle = "border-[#222222] bg-[#111111] text-neutral-600";
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

              {/* Explanation */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-[#181818] border border-[#2D2D2D] space-y-1">
                  <span className="text-xs font-bold text-[#E51020]">💡 Explicación Técnica:</span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Award className="w-16 h-16 text-[#E51020] mx-auto animate-bounce" />
              <h4 className="text-2xl font-black text-white uppercase">¡Evaluación Finalizada!</h4>
              <p className="text-neutral-300 text-sm max-w-md mx-auto">
                Tus respuestas han sido evaluadas y tu calificación ha sido registrada permanentemente en el sistema de la Universidad Aztlán.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#E51020] hover:bg-[#C40816] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow red-glow"
                >
                  Volver al Módulo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!quizFinished && (
          <div className="bg-[#181818] px-6 py-4 border-t border-[#2A2A2A] flex items-center justify-between">
            <span className="text-xs text-neutral-400">
              {selectedOpt === undefined ? "Selecciona una opción para comprobar" : "Opción seleccionada"}
            </span>
            {!isAnswerSubmitted ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === undefined}
                className="bg-[#E51020] hover:bg-[#C40816] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
              >
                Comprobar Respuesta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-white hover:bg-neutral-200 text-black text-xs font-black px-5 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                <span>{currentIdx + 1 < questions.length ? "Siguiente Pregunta" : "Ver Calificación Final"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
