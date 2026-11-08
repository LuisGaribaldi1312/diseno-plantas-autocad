'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { getAllProgress, gradeStudentProject, saveAllProgress } from '@/lib/storage';
import { User, Role, StudentProgress } from '@/lib/types';
import {
  ShieldCheck,
  UserPlus,
  Key,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Award,
  BookOpen,
  Terminal,
  ExternalLink,
  Edit3
} from 'lucide-react';

export default function AdminPage() {
  const { user, users, createUser, updateUserPassword, deleteUser, isAdmin } = useAuth();
  const allProgress = getAllProgress();

  // Search and filter
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

  // If not admin, show unauthorized notice
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-[#121924] border border-amber-800/80 p-8 rounded-2xl max-w-md text-center space-y-4">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Acceso Restringido a Super Administradores</h2>
          <p className="text-xs text-slate-400">
            Este módulo es de uso exclusivo para docentes y directores de carrera de Universidad Aztlán.
            Inicia sesión con la cuenta de Super Administrador para gestionar usuarios y calificaciones.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono text-cyan-400 block">
              Admin predeterminado: admin@aztlan.edu.mx
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.matricula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handle Create User Submit
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

  // Handle Password Change Submit
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

  // Handle Grade Project Submit
  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingUser) return;
    gradeStudentProject(gradingUser.user.id, gradeInput);
    setGradingUser(null);
  };

  // Export CSV Report
  const handleExportCSV = () => {
    let csv = "ID,Nombre,Matricula,Email,Rol,ProgresoGlobal,UnidadesCompletadas,PracticasCompletadas,PromedioQuiz,ProyectoEstatus,ProyectoNota,UltimoAcceso\n";

    users.forEach(u => {
      const p = allProgress[u.id];
      const uCount = p ? Object.values(p.units).filter(un => un.completed).length : 0;
      const prCount = p ? Object.values(p.practices).filter(pr => pr.completed).length : 0;
      const qScores = p ? Object.values(p.quizScores) : [];
      const qAvg = qScores.length > 0 ? Math.round(qScores.reduce((a, b) => a + b, 0) / qScores.length) : 0;
      const global = Math.round(((uCount / 6) * 0.4 + (prCount / 6) * 0.4 + (p?.projectStatus === 'evaluado' ? 0.2 : 0)) * 100);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 blueprint-grid">
      {/* 1. ADMIN HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/40 via-[#19212d] to-[#141b25] p-6 sm:p-8 rounded-2xl border border-amber-800/60 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 text-amber-300 text-xs font-mono border border-amber-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PANEL DE CONTROL DEL SUPER ADMINISTRADOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Gestión Académica de Usuarios & Calificaciones
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Crea cuentas de estudiantes, asigna y resetea contraseñas, y supervisa el avance en AutoCAD en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Descargar CSV</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Crear Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* 2. STATS PILLS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#131b26] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Total de Usuarios</span>
            <span className="text-2xl font-bold text-white font-mono">{users.length}</span>
          </div>
          <span className="text-xs bg-slate-800 text-cyan-300 px-2 py-1 rounded font-mono">
            {users.filter(u => u.role === 'student').length} Alumnos
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#131b26] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Prácticas Resueltas</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">
              {Object.values(allProgress).reduce(
                (acc, p) => acc + Object.values(p.practices).filter(pr => pr.completed).length,
                0
              )}
            </span>
          </div>
          <Terminal className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-4 rounded-xl bg-[#131b26] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Proyectos Entregados</span>
            <span className="text-2xl font-bold text-amber-400 font-mono">
              {Object.values(allProgress).filter(p => p.projectStatus === 'entregado' || p.projectStatus === 'evaluado').length}
            </span>
          </div>
          <Award className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* 3. USER MANAGEMENT TABLE */}
      <div className="bg-[#121924] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-[#17212f] px-3.5 py-2 rounded-xl border border-slate-700">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o matrícula..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filtrar rol:</span>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value as any)}
              className="bg-[#17212f] text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
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
            <thead className="bg-[#162130] text-slate-400 font-mono uppercase text-[10px]">
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
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map(u => {
                const p = allProgress[u.id];
                const uCount = p ? Object.values(p.units).filter(un => un.completed).length : 0;
                const prCount = p ? Object.values(p.practices).filter(pr => pr.completed).length : 0;
                const globalPercent = Math.round(
                  ((uCount / 6) * 0.4 + (prCount / 6) * 0.4 + (p?.projectStatus === 'evaluado' ? 0.2 : p?.projectStatus === 'entregado' ? 0.15 : 0)) * 100
                );

                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-cyan-400">
                      {u.matricula}
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          u.role === 'admin'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        }`}
                      >
                        {u.role === 'admin' ? 'Super Admin' : 'Alumno'}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-500 h-full"
                            style={{ width: `${globalPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-slate-300 text-[11px]">{globalPercent}%</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-slate-300">
                      {uCount} / 6
                    </td>

                    <td className="px-4 py-3.5 font-mono text-emerald-400">
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
                          className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2.5 py-1 rounded border border-amber-500/40 text-[11px] font-semibold transition"
                        >
                          Evaluar Entrega
                        </button>
                      ) : (
                        <span className="text-slate-500 italic">No entregado</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                      {/* Change Password Button */}
                      <button
                        onClick={() => {
                          setSelectedUserForPassword(u);
                          setTargetNewPassword('');
                          setPassMsg(null);
                        }}
                        title="Asignar / Cambiar Contraseña"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/40 text-cyan-400 border border-slate-700 transition"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete User Button */}
                      {u.id !== user?.id && u.email !== 'admin@aztlan.edu.mx' && (
                        <button
                          onClick={() => {
                            if (confirm(`¿Estás seguro de eliminar a ${u.name}?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          title="Eliminar Usuario"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 border border-slate-700 transition"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d2a] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>Crear Nuevo Usuario (Estudiante o Docente)</span>
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {createMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  createMsg.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-200'
                    : 'bg-red-950/60 border border-red-700 text-red-200'
                }`}
              >
                {createMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{createMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ej: José Antonio Hernández"
                  className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    placeholder="usuario@aztlan.edu.mx"
                    className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Matrícula / Código
                  </label>
                  <input
                    type="text"
                    value={newMatricula}
                    onChange={e => setNewMatricula(e.target.value)}
                    placeholder="AZT-1057-XXXX"
                    className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Rol en la Materia
                  </label>
                  <select
                    value={newRole}
                    onChange={e => setNewRole(e.target.value as Role)}
                    className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="student">Estudiante (10° Cuatrimestre)</option>
                    <option value="admin">Super Administrador / Docente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contraseña Inicial
                  </label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Contraseña segura"
                    className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Carrera / Programa
                </label>
                <input
                  type="text"
                  value={newCarrera}
                  onChange={e => setNewCarrera(e.target.value)}
                  className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2 rounded-xl text-xs shadow"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d2a] border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400" />
                <span>Asignar Contraseña a Usuario</span>
              </h3>
              <button
                onClick={() => setSelectedUserForPassword(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Establece una nueva contraseña para el estudiante{' '}
              <strong className="text-white">{selectedUserForPassword.name}</strong> ({selectedUserForPassword.email}).
            </p>

            {passMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passMsg.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-200'
                    : 'bg-red-950/60 border border-red-700 text-red-200'
                }`}
              >
                {passMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{passMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="text"
                  required
                  value={targetNewPassword}
                  onChange={e => setTargetNewPassword(e.target.value)}
                  placeholder="Escribe la nueva contraseña..."
                  className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTargetNewPassword(`Aztlan${Math.floor(1000 + Math.random() * 9000)}!`)}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  ⚡ Generar Contraseña Aleatoria Segura
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForPassword(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2 rounded-xl text-xs shadow"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: EVALUAR PROYECTO CAPSTONE */}
      {gradingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141d2a] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Calificar Proyecto Final de Planta</span>
              </h3>
              <button
                onClick={() => setGradingUser(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <strong>Estudiante:</strong> {gradingUser.user.name} ({gradingUser.user.matricula})
              </p>
              {gradingUser.progress.projectUrl && (
                <p>
                  <strong>Enlace del Entregable (GitHub / Drive / DWG):</strong>{' '}
                  <a
                    href={gradingUser.progress.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline inline-flex items-center gap-1"
                  >
                    {gradingUser.progress.projectUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              )}
              {gradingUser.progress.projectNotes && (
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-semibold mb-1">Notas del Estudiante:</span>
                  <p className="text-slate-200">{gradingUser.progress.projectNotes}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Calificación Final (0 a 100 puntos)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradeInput}
                  onChange={e => setGradeInput(Number(e.target.value))}
                  className="w-full bg-[#192332] border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGradingUser(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl text-xs shadow"
                >
                  Registrar Calificación Oficial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
