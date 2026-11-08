'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  Building2,
  BookOpen,
  Terminal,
  ShieldCheck,
  FileSpreadsheet,
  Award,
  LogOut,
  LogIn,
  UserCheck,
  Menu,
  X,
  Compass,
  FileCheck2
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Inicio', icon: Building2 },
    { href: '/dashboard', label: 'Mi Avance', icon: BookOpen },
    { href: '/laboratorio-cad', label: 'Simulador AutoCAD', icon: Terminal, highlight: true },
    { href: '/practicas', label: 'Prácticas Virtuales', icon: FileCheck2 },
    { href: '/proyecto-final', label: 'Proyecto Final', icon: Award },
    { href: '/normativas', label: 'Normativas', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0e1622]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Institution */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/30 group-hover:scale-105 transition">
              <span className="font-mono text-base tracking-tighter">CAD</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition">
                  DISEÑO DE PLANTAS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  CLAVE 1057
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Universidad Aztlán • Décimo Cuatrimestre
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                      : link.highlight
                      ? 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Admin Portal Tab */}
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ml-1 ${
                  pathname === '/admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-amber-950/40 text-amber-400 border border-amber-800/60 hover:bg-amber-900/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Super Administrador</span>
              </Link>
            )}
          </nav>

          {/* User Session Badges */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-800/80 pl-3 pr-1.5 py-1 rounded-full border border-slate-700">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white leading-tight">
                    {user.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">
                    {user.role === 'admin' ? 'Super Admin' : user.matricula}
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400 hover:text-red-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 rounded-lg shadow-md transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111a28] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Super Administrador (Usuarios)</span>
            </Link>
          )}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-300">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 bg-cyan-600 text-white font-semibold rounded-lg text-xs"
              >
                Acceso al Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
