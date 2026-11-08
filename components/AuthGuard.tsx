'use client';

import React from 'react';
import { useAuth } from '@/lib/authContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, LogIn, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Allow unrestricted access to the dedicated /login route
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // If not logged in, enforce the AutoCAD Authentication Wall
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 autocad-grid bg-[#0A0A0A]">
        <div className="w-full max-w-md space-y-6">
          {/* AutoCAD Red Header Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#E51020] mx-auto flex items-center justify-center font-bold text-white shadow-xl red-glow">
              <span className="font-mono text-2xl font-black tracking-tighter">CAD</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E51020] bg-red-950/60 border border-red-800/80 px-2.5 py-1 rounded-full inline-block mb-1">
                Autodesk AutoCAD 2026 • Universidad Aztlán
              </span>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                Diseño de Plantas Industriales
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Clave 1057 • Décimo Cuatrimestre
              </p>
            </div>
          </div>

          {/* Notice Box */}
          <div className="bg-[#141414] border border-[#333333] rounded-2xl p-7 shadow-2xl space-y-5 text-center">
            <div className="w-10 h-10 rounded-full bg-red-950/80 border border-[#E51020] flex items-center justify-center text-[#E51020] mx-auto">
              <Lock className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-white">Acceso Académico Restringido</h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Por disposición institucional, debes iniciar sesión con tu cuenta de estudiante o super administrador
                para acceder a los contenidos temáticos, simulador de AutoCAD y prácticas virtuales.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 bg-[#E51020] hover:bg-[#C40816] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition red-border-glow shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Ingresar al Portal con mis Credenciales</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, render the application normally
  return <>{children}</>;
}
