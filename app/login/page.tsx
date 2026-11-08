'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { LogIn, ShieldCheck, UserCheck, AlertCircle, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = login(email, password);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = login(demoEmail, demoPass);
    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        router.push(demoEmail.includes('admin') ? '/admin' : '/dashboard');
      }, 700);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 blueprint-grid">
      <div className="w-full max-w-md space-y-6">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la página principal</span>
        </Link>

        {/* Card */}
        <div className="bg-[#121924] border border-slate-700/80 rounded-2xl p-8 shadow-2xl space-y-6 backdrop-blur-md">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 mx-auto flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/40">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Acceso al Portal Académico</h2>
            <p className="text-xs text-slate-400">
              Materia de Diseño de Plantas con AutoCAD • Universidad Aztlán
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-700 text-xs text-red-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Institucional o Usuario
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ejemplo@aztlan.edu.mx"
                className="w-full bg-[#17212f] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Contraseña
                </label>
                <span className="text-[11px] text-cyan-400">¿Olvidaste tu clave? Contacta a tu docente</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#17212f] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Ingresar al Sistema</span>
            </button>
          </form>

          {/* Quick Login Presets for Evaluator */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 block font-semibold text-center uppercase tracking-wider">
              ⚡ Acceso Rápido de Prueba (1 Clic)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@aztlan.edu.mx', 'Admin2026!')}
                className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-amber-300 text-xs font-semibold flex flex-col items-center gap-1 transition"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Super Admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('estudiante@aztlan.edu.mx', 'Alumno2026!')}
                className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 text-cyan-300 text-xs font-semibold flex flex-col items-center gap-1 transition"
              >
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Estudiante Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
