'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { LogIn, AlertCircle, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          router.push('/dashboard');
        }, 700);
      } else {
        setErrorMessage(res.message);
      }
    } catch (err: any) {
      setErrorMessage('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 autocad-grid bg-[#0A0A0A]">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#E51020]" />
          <span>Volver al inicio</span>
        </Link>

        {/* Card AutoCAD Red / Black / White */}
        <div className="bg-[#141414] border border-[#2D2D2D] rounded-2xl p-8 shadow-2xl space-y-6 red-border-glow">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#E51020] mx-auto flex items-center justify-center font-black text-white shadow-xl red-glow">
              <span className="font-mono text-xl">CAD</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Acceso a la Plataforma
            </h2>
            <p className="text-xs text-neutral-400">
              Materia de Diseño de Plantas con AutoCAD • Universidad Aztlán
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-700 text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#E51020] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Correo Institucional o Usuario
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@aztlan.edu.mx"
                className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E51020] focus:ring-1 focus:ring-[#E51020] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-neutral-300">
                  Contraseña
                </label>
                <span className="text-[11px] text-[#FF4D5A]">¿Olvidaste tu clave? Contacta a tu docente</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E51020] focus:ring-1 focus:ring-[#E51020] transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E51020] hover:bg-[#C40816] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 red-glow"
            >
              <LogIn className="w-4 h-4" />
              <span>{isSubmitting ? 'Verificando credenciales...' : 'Ingresar al Portal Académico'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
