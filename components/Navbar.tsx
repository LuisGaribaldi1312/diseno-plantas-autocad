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
  Award,
  LogOut,
  LogIn,
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
    <header className="sticky top-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#262626] text-white">
      {/* Top micro red line */}
      <div className="h-0.5 bg-[#E51020] w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Institution */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#E51020] flex items-center justify-center font-black text-white shadow-lg shadow-red-950/60 group-hover:scale-105 transition red-glow">
              <span className="font-mono text-base tracking-tighter">CAD</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-white group-hover:text-[#E51020] transition">
                  DISEÑO DE PLANTAS
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-950 text-[#FF4D5A] border border-red-800">
                  CLAVE 1057
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">
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
                      ? 'bg-[#E51020] text-white shadow-md'
                      : link.highlight
                      ? 'bg-[#1C1C1C] text-[#FF4D5A] hover:bg-[#282828] border border-red-800/60'
                      : 'text-neutral-300 hover:text-white hover:bg-[#1C1C1C]'
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
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'bg-red-950/50 text-[#FF6B76] border border-red-800/80 hover:bg-red-900/40'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#E51020]" />
                <span>Super Administrador</span>
              </Link>
            )}
          </nav>

          {/* User Session Badges */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-[#171717] pl-3 pr-1.5 py-1 rounded-full border border-[#333333]">
                <div className="text-right">
                  <div className="text-xs font-bold text-white leading-tight">
                    {user.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-[#E51020] font-mono font-semibold">
                    {user.role === 'admin' ? 'Super Admin' : user.matricula}
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-full hover:bg-[#262626] text-neutral-400 hover:text-[#E51020] transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-xs font-bold bg-[#E51020] hover:bg-[#C40816] text-white px-4 py-2 rounded-lg shadow-md shadow-red-950/50 transition"
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
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-[#1C1C1C]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-[#262626] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-[#E51020] text-white' : 'text-neutral-300 hover:bg-[#1C1C1C]'
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#FF6B76] bg-red-950/40 border border-red-800/40"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Super Administrador (Usuarios)</span>
            </Link>
          )}

          <div className="pt-2 border-t border-[#262626] flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-neutral-300">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-[#E51020] font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 bg-[#E51020] text-white font-bold rounded-lg text-xs"
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
