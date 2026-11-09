'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { getAllProgress, gradeStudentProject, pullLatestRemoteProgress, calculateStudentOverallPercent } from '@/lib/storage';
import { p2pManager } from '@/lib/p2pSync';
import { User, Role, StudentProgress } from '@/lib/types';
import {
  ShieldCheck,
  UserPlus,
  Key,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
  Terminal,
  ExternalLink,
  Radio,
  RefreshCw,
  Activity,
  Wifi,
  Eye
} from 'lucide-react';

export default function AdminPage() {
  const { user, users, createUser, updateUserPassword, deleteUser, isAdmin, refreshUsers } = useAuth();
  const [progressData, setProgressData] = useState<Record<string, StudentProgress>>(() => getAllProgress());
  const [p2pStatus, setP2pStatus] = useState({ connected: false, peerCount: 0, peerId: '', mode: 'idle' });
  const [recentP2PEvents, setRecentP2PEvents] = useState<Array<{ id: string; studentName: string; text: string; time: string }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Sincronizando...');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Sync P2P and Cloud polling
  useEffect(() => {
    // 1. Initial pull from cloud
    const doPull = async () => {
      try {
        const remote = await pullLatestRemoteProgress();
        setProgressData(remote);
        setLastSyncTime(new Date().toLocaleTimeString('es-MX'));
      } catch (e) {}
    };
    doPull();

    // 2. Poll every 4 seconds for continuous real-time sync
    const interval = setInterval(doPull, 4000);

    // 3. Listen to P2P direct events
    const unsubP2P = p2pManager.subscribe((msg) => {
      if (msg.type === 'PROGRESS_UPDATE' && msg.userId && msg.progress) {
        setProgressData(prev => ({
          ...prev,
          [msg.userId]: msg.progress
        }));
        setRecentP2PEvents(prev => [
          {
            id: `${Date.now()}-${Math.random()}`,
            studentName: msg.studentName,
            text: msg.summaryText || 'Actualizó avance en tiempo real',
            time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          },
          ...prev.slice(0, 5)
        ]);
      }
    });

    const unsubStatus = p2pManager.subscribeStatus((st) => {
      setP2pStatus(st);
    });

    return () => {
      clearInterval(interval);
      unsubP2P();
      unsubStatus();
    };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      p2pManager.requestAllStudentsSync();
      const remote = await pullLatestRemoteProgress();
      setProgressData(remote);
      refreshUsers();
      setLastSyncTime(new Date().toLocaleTimeString('es-MX'));
      setSyncFeedback('¡Avances y lista de usuarios sincronizados en tiempo real!');
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch (e) {
      setSyncFeedback('Sincronización completada con datos locales.');
    } finally {
      setIsSyncing(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');

  // Modal: Create User
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMatricula, setNewMatricula] = useState('');
  const [newCarrera, setNewCarrera] = useState('Ingeniería Industrial');
  const [newPassword, setNewPassword] = useState('Aztlan2026!');
  const [newRole, setNewRole] = useState<Role>('student');
  const [createMsg, setCreateMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Modal: Change Password
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | null>(null);
  const [targetNewPassword, setTargetNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Modal: Grade Project
  const [gradingUser, setGradingUser] = useState<{ user: User; progress: StudentProgress } | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(100);

  // Modal: View Student Full Details
  const [viewingDetailsUser, setViewingDetailsUser] = useState<{ user: User; progress: StudentProgress } | null>(null);

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-[#141414] border border-red-800 p-8 rounded-2xl max-w-md text-center space-y-4 shadow-2xl">
          <ShieldCheck className="w-12 h-12 text-[#E51020] mx-auto" />
          <h2 className="text-xl font-black text-white uppercase">Acceso Restringido a Super Administradores</h2>
          <p className="text-xs text-neutral-400">
            Este módulo es de uso exclusivo para docentes y directores de carrera de Universidad Aztlán.
            Inicia sesión con la cuenta de Super Administrador para gestionar usuarios y calificaciones.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono text-[#E51020] font-bold block">
              Coordinación Académica • Universidad Aztlán
            </span>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.matricula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateMsg(null);

    const res = createUser({
      name: newName,
      email: newEmail,
      matricula: newMatricula || `AZT-${Math.floor(1000 + Math.random() * 9000)}`,
      carrera: newCarrera,
      password: newPassword,
      role: newRole,
      lastLogin: undefined
    });

    if (res.success) {
      setCreateMsg({ type: 'success', text: res.message });
      setNewName('');
      setNewEmail('');
      setNewMatricula('');
      setTimeout(() => {
        setIsCreateOpen(false);
        setCreateMsg(null);
      }, 1200);
    } else {
      setCreateMsg({ type: 'error', text: res.message });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForPassword) return;
    setPassMsg(null);

    const res = updateUserPassword(selectedUserForPassword.id, targetNewPassword);
    if (res.success) {
      setPassMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        setSelectedUserForPassword(null);
        setTargetNewPassword('');
        setPassMsg(null);
      }, 1200);
    } else {
      setPassMsg({ type: 'error', text: res.message });
    }
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingUser) return;
    gradeStudentProject(gradingUser.user.id, gradeInput);
    setGradingUser(null);
  };

  const handleExportCSV = () => {
    let csv = "ID,Nombre,Matricula,Email,Rol,ProgresoGlobal,UnidadesCompletadas,PracticasCompletadas,PromedioQuiz,ProyectoEstatus,ProyectoNota,UltimoAcceso\n";

    users.forEach(u => {
      const p = progressData[u.id];
      const uCount = p ? Object.values(p.units).filter(un => un.completed).length : 0;
      const prCount = p ? Object.values(p.practices).filter(pr => pr.completed).length : 0;
      const qScores = p ? Object.values(p.quizScores) : [];
      const qAvg = qScores.length > 0 ? Math.round(qScores.reduce((a, b) => a + b, 0) / qScores.length) : 0;
      const global = p?.globalPercent !== undefined ? p.globalPercent : calculateStudentOverallPercent(p);

      csv += `"${u.id}","${u.name}","${u.matricula}","${u.email}","${u.role}","${global}%","${uCount}/6","${prCount}/6","${qAvg}%","${p?.projectStatus || 'no_iniciado'}","${p?.projectGrade || 'N/A'}","${u.lastLogin || 'Nunca'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Reporte_Calificaciones_Diseno_Plantas_AutoCAD_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-8 autocad-grid bg-[#0A0A0A]">
      {/* 1. ADMIN HEADER (AutoCAD Red / Deep Charcoal) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-6 sm:p-8 rounded-2xl border border-red-800/80 shadow-2xl red-border-glow">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 text-[#FF4D5A] text-xs font-mono font-bold border border-red-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PANEL DE CONTROL DEL SUPER ADMINISTRADOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Gestión Académica de Usuarios & Avances
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300">
            Crea cuentas de estudiantes, asigna y resetea contraseñas, y supervisa el progreso en AutoCAD en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 text-xs bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white font-bold px-4 py-2.5 rounded-xl border border-[#333333] transition"
          >
            <Download className="w-4 h-4 text-[#E51020]" />
            <span>Descargar CSV</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-xs bg-[#E51020] hover:bg-[#C40816] text-white font-black px-5 py-2.5 rounded-xl shadow-lg shadow-red-950/60 transition red-glow"
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* REAL-TIME P2P & CLOUD SYNC CONTROL BAR */}
      <div className="bg-[#141414] border border-[#2D2D2D] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 red-border-glow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-700 flex items-center justify-center text-[#E51020] shadow">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Sincronización P2P en Tiempo Real & Nube Vercel Blob
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                {p2pStatus.connected ? 'Red P2P Activa (PeerJS)' : 'Conectando Nodo P2P...'}
              </span>
              {syncFeedback && (
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700 animate-in fade-in">
                  ✓ {syncFeedback}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Hub Docente: <span className="font-mono text-[#FF6B76] font-bold">{p2pStatus.peerId || 'aztlan-hub-profesor-1057'}</span> • {p2pStatus.peerCount} alumno(s) enlazados directamente • Última actualización: <span className="text-white font-mono">{lastSyncTime}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full md:w-auto flex items-center justify-center gap-2 text-xs bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white font-bold px-4 py-2.5 rounded-xl border border-[#333333] transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E51020] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : '🔄 Forzar Sincronización Inmediata'}</span>
          </button>
        </div>
      </div>

      {/* RECENT LIVE P2P EVENT FEED */}
      {recentP2PEvents.length > 0 && (
        <div className="bg-[#121212] border border-[#282828] rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-300">
            <Activity className="w-3.5 h-3.5 text-[#E51020]" />
            <span>Feed de Actividad de Alumnos en Vivo (P2P):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {recentP2PEvents.map((ev) => (
              <div key={ev.id} className="p-2.5 rounded-lg bg-[#181818] border border-[#2E2E2E] text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{ev.studentName}</span>
                  <span className="text-[11px] text-[#FF6B76] line-clamp-1">{ev.text}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono shrink-0 pl-2">{ev.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STATS PILLS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block font-bold">Total de Usuarios</span>
            <span className="text-2xl font-black text-white font-mono">{users.length}</span>
          </div>
          <span className="text-xs bg-[#222222] text-[#FF4D5A] px-2.5 py-1 rounded font-mono font-bold">
            {users.filter(u => u.role === 'student').length} Alumnos
          </span>
        </div>

        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block font-bold">Prácticas Resueltas</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {Object.values(progressData).reduce(
                (acc, p) => acc + Object.values(p.practices).filter(pr => pr.completed).length,
                0
              )}
            </span>
          </div>
          <Terminal className="w-6 h-6 text-[#E51020]" />
        </div>

        <div className="p-5 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block font-bold">Proyectos Entregados</span>
            <span className="text-2xl font-black text-[#E51020] font-mono">
              {Object.values(progressData).filter(p => p.projectStatus === 'entregado' || p.projectStatus === 'evaluado').length}
            </span>
          </div>
          <Award className="w-6 h-6 text-[#E51020]" />
        </div>
      </div>

      {/* 3. USER MANAGEMENT TABLE */}
      <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-[#1C1C1C] px-3.5 py-2.5 rounded-xl border border-[#333333]">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o matrícula..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-bold">Filtrar rol:</span>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value as any)}
              className="bg-[#1C1C1C] text-xs text-white px-3 py-2 rounded-xl border border-[#333333] focus:outline-none"
            >
              <option value="all">Todos los Roles</option>
              <option value="student">Estudiantes</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1C1C1C] text-neutral-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Estudiante / Usuario</th>
                <th className="px-4 py-3">Matrícula</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Progreso Global</th>
                <th className="px-4 py-3">Unidades</th>
                <th className="px-4 py-3">Prácticas CAD</th>
                <th className="px-4 py-3">Proyecto Capstone</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222222]">
              {filteredUsers.map(u => {
                const p = progressData[u.id];
                const uCount = p ? Object.values(p.units).filter(un => un.completed).length : 0;
                const prCount = p ? Object.values(p.practices).filter(pr => pr.completed).length : 0;
                const globalPercent = p?.globalPercent !== undefined
                  ? p.globalPercent
                  : calculateStudentOverallPercent(p);

                return (
                  <tr key={u.id} className="hover:bg-[#1A1A1A] transition">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[11px] text-neutral-400 font-mono">{u.email}</div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-[#E51020] font-bold">
                      {u.matricula}
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          u.role === 'admin'
                            ? 'bg-red-950 text-[#FF4D5A] border border-red-800'
                            : 'bg-[#222222] text-neutral-200 border border-[#333333]'
                        }`}
                      >
                        {u.role === 'admin' ? 'Super Admin' : 'Alumno'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#262626] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#E51020] h-full"
                            style={{ width: `${globalPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-white text-[11px] font-bold">{globalPercent}%</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-neutral-300">
                      {uCount} / 6
                    </td>

                    <td className="px-4 py-3.5 font-mono text-white font-bold">
                      {prCount} / 6
                    </td>

                    <td className="px-4 py-3.5">
                      {p?.projectStatus === 'evaluado' ? (
                        <span className="text-emerald-400 font-bold">
                          Nota: {p.projectGrade} / 100
                        </span>
                      ) : p?.projectStatus === 'entregado' ? (
                        <button
                          onClick={() => setGradingUser({ user: u, progress: p })}
                          className="bg-red-950/60 text-[#FF4D5A] hover:bg-red-900/60 px-2.5 py-1 rounded border border-red-800 text-[11px] font-bold transition"
                        >
                          Evaluar Entrega
                        </button>
                      ) : (
                        <span className="text-neutral-500 italic">No entregado</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setViewingDetailsUser({
                            user: u,
                            progress: p || {
                              userId: u.id,
                              units: {},
                              practices: {},
                              quizScores: {},
                              projectStatus: 'no_iniciado',
                              lastActive: ''
                            }
                          });
                        }}
                        title="Ver Desglose Completo de Avance"
                        className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#E51020] text-neutral-300 hover:text-white border border-[#333333] transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedUserForPassword(u);
                          setTargetNewPassword('');
                          setPassMsg(null);
                        }}
                        title="Asignar / Cambiar Contraseña"
                        className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#E51020] text-white border border-[#333333] transition"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>

                      {u.id !== user?.id && u.email !== 'admin@aztlan.edu.mx' && (
                        <button
                          onClick={() => {
                            if (confirm(`¿Estás seguro de ELIMINAR DEFINITIVAMENTE al usuario "${u.name}" (${u.email})?\n\nEsta acción borrará al usuario permanentemente de la plataforma y de la base de datos en la nube.`)) {
                              const res = deleteUser(u.id, u.email);
                              if (res && res.message) {
                                alert(res.message);
                              }
                            }
                          }}
                          title="Eliminar Usuario Permanentemente"
                          className="p-1.5 rounded-lg bg-[#222222] hover:bg-red-900 text-red-400 hover:text-white border border-[#333333] transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL: CREAR USUARIO */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#2D2D2D] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 red-border-glow">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#E51020]" />
                <span>Crear Nuevo Usuario (Estudiante o Docente)</span>
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {createMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  createMsg.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                    : 'bg-red-950/80 border border-red-700 text-red-200'
                }`}
              >
                {createMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{createMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ej: José Antonio Hernández"
                  className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E51020]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="usuario@aztlan.edu.mx"
                    className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E51020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Matrícula / Código
                  </label>
                  <input
                    type="text"
                    value={newMatricula}
                    onChange={e => setNewMatricula(e.target.value)}
                    placeholder="AZT-1057-XXXX"
                    className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E51020]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Rol en la Materia
                  </label>
                  <select
                    value={newRole}
                    onChange={e => setNewRole(e.target.value as Role)}
                    className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="student">Estudiante (10° Cuatrimestre)</option>
                    <option value="admin">Super Administrador / Docente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    Contraseña Inicial
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Contraseña segura"
                    className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E51020]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Carrera / Programa
                </label>
                <input
                  type="text"
                  value={newCarrera}
                  onChange={e => setNewCarrera(e.target.value)}
                  className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#E51020] hover:bg-[#C40816] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow red-glow"
                >
                  Guardar y Registrar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: ASIGNAR / CAMBIAR CONTRASEÑA */}
      {selectedUserForPassword && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#2D2D2D] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 red-border-glow">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                <Key className="w-5 h-5 text-[#E51020]" />
                <span>Asignar Contraseña a Usuario</span>
              </h3>
              <button
                onClick={() => setSelectedUserForPassword(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-300">
              Establece una nueva contraseña para el estudiante{' '}
              <strong className="text-white">{selectedUserForPassword.name}</strong> ({selectedUserForPassword.email}).
            </p>

            {passMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passMsg.type === 'success'
                    ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                    : 'bg-red-950/80 border border-red-700 text-red-200'
                }`}
              >
                {passMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{passMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="text"
                  required
                  value={targetNewPassword}
                  onChange={e => setTargetNewPassword(e.target.value)}
                  placeholder="Escribe la nueva contraseña..."
                  className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#E51020]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTargetNewPassword(`Aztlan${Math.floor(1000 + Math.random() * 9000)}!`)}
                  className="text-[11px] text-[#E51020] hover:underline font-bold"
                >
                  ⚡ Generar Contraseña Aleatoria Segura
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForPassword(null)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#E51020] hover:bg-[#C40816] text-white font-black px-5 py-2.5 rounded-xl text-xs shadow red-glow"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: EVALUAR PROYECTO */}
      {gradingUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#2D2D2D] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4 red-border-glow">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E51020]" />
                <span>Calificar Proyecto Final de Planta</span>
              </h3>
              <button
                onClick={() => setGradingUser(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-300">
              <p>
                <strong>Estudiante:</strong> {gradingUser.user.name} ({gradingUser.user.matricula})
              </p>
              {gradingUser.progress.projectUrl && (
                <p>
                  <strong>Enlace del Entregable:</strong>{' '}
                  <a
                    href={gradingUser.progress.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E51020] underline inline-flex items-center gap-1 font-bold"
                  >
                    {gradingUser.progress.projectUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              )}
              {gradingUser.progress.projectNotes && (
                <div className="p-3 bg-[#1C1C1C] rounded-lg border border-[#333333]">
                  <span className="text-neutral-400 block font-bold mb-1">Notas del Estudiante:</span>
                  <p className="text-white">{gradingUser.progress.projectNotes}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  Calificación Oficial (0 a 100 puntos)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradeInput}
                  onChange={e => setGradeInput(Number(e.target.value))}
                  className="w-full bg-[#1C1C1C] border border-[#333333] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#E51020]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGradingUser(null)}
                  className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#E51020] hover:bg-[#C40816] text-white font-black px-6 py-2.5 rounded-xl text-xs shadow red-glow"
                >
                  Registrar Calificación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: DETALLE COMPLETO DE AVANCES DEL ALUMNO */}
      {viewingDetailsUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#2D2D2D] w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 red-border-glow max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div>
                <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#E51020]" />
                  <span>Expediente de Avances: {viewingDetailsUser.user.name}</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {viewingDetailsUser.user.email} • {viewingDetailsUser.user.matricula}
                </p>
              </div>
              <button
                onClick={() => setViewingDetailsUser(null)}
                className="text-neutral-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Overall Score Badge */}
            <div className="bg-[#1C1C1C] p-4 rounded-xl border border-[#333333] flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 block font-bold">Porcentaje Real de Avance en Pantalla:</span>
                <span className="text-3xl font-black text-[#E51020] font-mono">
                  {viewingDetailsUser.progress.globalPercent !== undefined 
                    ? viewingDetailsUser.progress.globalPercent 
                    : calculateStudentOverallPercent(viewingDetailsUser.progress)}%
                </span>
              </div>
              <div className="text-right text-xs">
                <span className="text-neutral-400 block">Última Sincronización:</span>
                <span className="text-white font-mono font-bold">
                  {viewingDetailsUser.progress.lastSyncedAt
                    ? new Date(viewingDetailsUser.progress.lastSyncedAt).toLocaleString('es-MX')
                    : viewingDetailsUser.progress.lastActive
                    ? new Date(viewingDetailsUser.progress.lastActive).toLocaleString('es-MX')
                    : 'Sin registro'}
                </span>
              </div>
            </div>

            {/* Units Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#E51020]" />
                <span>Unidades Curriculares Aprobadas ({Object.values(viewingDetailsUser.progress.units || {}).filter(u => u.completed).length} de 6):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(viewingDetailsUser.progress.units || {}).map(([uid, u]) => (
                  <div key={uid} className="p-2.5 rounded-lg bg-[#181818] border border-[#2E2E2E] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white uppercase font-mono text-[11px] block">{uid}</span>
                      <span className="text-neutral-400 text-[10px]">
                        {u.completed ? '✓ Aprobado' : 'En proceso'}
                      </span>
                    </div>
                    <span className="font-mono text-[#E51020] font-bold">{u.score}%</span>
                  </div>
                ))}
                {Object.keys(viewingDetailsUser.progress.units || {}).length === 0 && (
                  <p className="text-xs text-neutral-500 italic col-span-2">El alumno aún no ha presentado quizzes de unidades.</p>
                )}
              </div>
            </div>

            {/* CAD Practices Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#E51020]" />
                <span>Prácticas de AutoCAD Completadas ({Object.values(viewingDetailsUser.progress.practices || {}).filter(p => p.completed).length} de 6):</span>
              </h4>
              <div className="space-y-2 text-xs">
                {Object.entries(viewingDetailsUser.progress.practices || {}).map(([pid, pr]) => (
                  <div key={pid} className="p-3 rounded-lg bg-[#181818] border border-[#2E2E2E] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white uppercase font-mono text-[11px]">{pid}</span>
                      <span className="font-mono text-emerald-400 font-bold">{pr.score}%</span>
                    </div>
                    {pr.commandsUsed && pr.commandsUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[10px] text-neutral-400">Comandos ejecutados:</span>
                        {pr.commandsUsed.map((cmd, i) => (
                          <span key={i} className="px-1.5 py-0.2 bg-[#252525] text-[#FF4D5A] rounded font-mono text-[10px]">
                            {cmd}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {Object.keys(viewingDetailsUser.progress.practices || {}).length === 0 && (
                  <p className="text-xs text-neutral-500 italic">El alumno aún no ha enviado prácticas virtuales de AutoCAD.</p>
                )}
              </div>
            </div>

            {/* Project Status */}
            <div className="space-y-2 border-t border-[#262626] pt-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#E51020]" />
                <span>Proyecto Final Capstone:</span>
              </h4>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#2E2E2E] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">
                    Estatus: <strong className="text-white uppercase font-mono">{viewingDetailsUser.progress.projectStatus}</strong>
                  </span>
                  {viewingDetailsUser.progress.projectGrade !== undefined && (
                    <span className="text-emerald-400 font-bold font-mono">
                      Nota asignada: {viewingDetailsUser.progress.projectGrade}/100
                    </span>
                  )}
                </div>
                {viewingDetailsUser.progress.projectUrl && (
                  <p className="text-neutral-400">
                    URL entregada:{' '}
                    <a
                      href={viewingDetailsUser.progress.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#E51020] underline font-bold"
                    >
                      {viewingDetailsUser.progress.projectUrl}
                    </a>
                  </p>
                )}
                {viewingDetailsUser.progress.projectNotes && (
                  <p className="text-neutral-300 bg-[#121212] p-2 rounded border border-[#2A2A2A]">
                    {viewingDetailsUser.progress.projectNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingDetailsUser(null)}
                className="bg-[#242424] hover:bg-[#333333] text-white px-5 py-2 rounded-xl text-xs font-bold transition"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
