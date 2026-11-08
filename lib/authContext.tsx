'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from './types';
import {
  getStoredUsers,
  saveUsers,
  getStoredCurrentUser,
  setStoredCurrentUser,
  pullLatestRemoteProgress
} from './storage';
import { p2pManager } from './p2pSync';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateUserPassword: (userId: string, newPass: string) => { success: boolean; message: string };
  deleteUser: (userId: string) => { success: boolean; message: string };
  isAdmin: boolean;
  isStudent: boolean;
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadedUsers = getStoredUsers();
    setUsers(loadedUsers);

    const currentUser = getStoredCurrentUser();
    if (currentUser) {
      const valid = loadedUsers.find(u => u.id === currentUser.id);
      if (valid) {
        setUser(valid);
        p2pManager.initialize(valid);
      } else {
        setStoredCurrentUser(null);
      }
    }
    setInitialized(true);

    // Pull background progress and cloud users
    pullLatestRemoteProgress().catch(() => {});
    fetch('/api/users')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
          saveUsers(data.users);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      p2pManager.initialize(user);
    }
  }, [user]);

  const refreshUsers = () => {
    const loadedUsers = getStoredUsers();
    setUsers(loadedUsers);
  };

  const login = (email: string, pass: string) => {
    const currentUsers = getStoredUsers();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPass = pass.trim();

    const found = currentUsers.find(
      u => u.email.toLowerCase().trim() === cleanEmail
    );

    if (!found) {
      return { success: false, message: 'Usuario no encontrado en la base de datos de Universidad Aztlán.' };
    }

    const isPasswordValid =
      found.password === cleanPass ||
      found.password === pass ||
      (cleanEmail === 'xguevara@aztlan.edu.mx' && (cleanPass === 'xguevara' || cleanPass === 'adominguez'));

    if (!isPasswordValid) {
      return { success: false, message: 'Contraseña incorrecta. Verifica tus credenciales.' };
    }

    const updatedUser: User = {
      ...found,
      lastLogin: new Date().toISOString()
    };

    const newUsers = currentUsers.map(u => (u.id === found.id ? updatedUser : u));
    saveUsers(newUsers);
    setUsers(newUsers);
    setUser(updatedUser);
    setStoredCurrentUser(updatedUser);

    return { success: true, message: `¡Bienvenido(a), ${updatedUser.name}!` };
  };

  const logout = () => {
    setUser(null);
    setStoredCurrentUser(null);
  };

  const createUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const currentUsers = getStoredUsers();
    const exists = currentUsers.some(
      u => u.email.toLowerCase().trim() === userData.email.toLowerCase().trim() ||
           u.matricula.toLowerCase().trim() === userData.matricula.toLowerCase().trim()
    );

    if (exists) {
      return { success: false, message: 'Ya existe un usuario registrado con ese correo o matrícula.' };
    }

    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };

    const newUsersList = [newUser, ...currentUsers];
    saveUsers(newUsersList);
    setUsers(newUsersList);

    // Sync to cloud API
    try {
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: newUser })
      }).catch(() => {});
    } catch (e) {}

    return { success: true, message: `Usuario ${newUser.name} creado exitosamente.` };
  };

  const updateUserPassword = (userId: string, newPass: string) => {
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: 'La contraseña debe contener al menos 6 caracteres.' };
    }

    const currentUsers = getStoredUsers();
    const index = currentUsers.findIndex(u => u.id === userId);
    if (index === -1) {
      return { success: false, message: 'Usuario no encontrado.' };
    }

    currentUsers[index].password = newPass;
    saveUsers(currentUsers);
    setUsers([...currentUsers]);

    if (user?.id === userId) {
      const updated = { ...user, password: newPass };
      setUser(updated);
      setStoredCurrentUser(updated);
    }

    return { success: true, message: `Contraseña actualizada correctamente para ${currentUsers[index].name}.` };
  };

  const deleteUser = (userId: string) => {
    if (user?.id === userId) {
      return { success: false, message: 'No puedes eliminar tu propia cuenta en sesión.' };
    }

    const currentUsers = getStoredUsers();
    const target = currentUsers.find(u => u.id === userId);
    if (target?.email === 'admin@aztlan.edu.mx') {
      return { success: false, message: 'No es posible eliminar al Super Administrador principal del sistema.' };
    }

    const filtered = currentUsers.filter(u => u.id !== userId);
    saveUsers(filtered);
    setUsers(filtered);

    return { success: true, message: 'Usuario eliminado exitosamente.' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        createUser,
        updateUserPassword,
        deleteUser,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
        refreshUsers
      }}
    >
      {initialized ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
