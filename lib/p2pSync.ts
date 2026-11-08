'use client';

import { StudentProgress, User } from './types';

export const P2P_TEACHER_HUB_ID = 'aztlan-hub-profesor-1057';

export interface P2PEventMessage {
  type: 'PROGRESS_UPDATE' | 'REQUEST_SYNC' | 'SYNC_RESPONSE' | 'HEARTBEAT';
  userId: string;
  studentName: string;
  progress: StudentProgress;
  summaryText?: string;
  timestamp: string;
}

type P2PListener = (msg: P2PEventMessage) => void;
type StatusListener = (status: { connected: boolean; peerCount: number; peerId: string; mode: 'admin' | 'student' | 'idle' }) => void;

class P2PManager {
  private peer: any = null;
  private connections: Map<string, any> = new Map();
  private broadcastChannel: BroadcastChannel | null = null;
  private listeners: Set<P2PListener> = new Set();
  private statusListeners: Set<StatusListener> = new Set();
  private currentUser: User | null = null;
  private isTeacher: boolean = false;
  private peerId: string = '';
  private isConnected: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('aztlan_cad_p2p_channel');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data) {
          this.notifyListeners(event.data);
        }
      };
    }
  }

  public async initialize(user: User): Promise<void> {
    if (typeof window === 'undefined') return;
    this.currentUser = user;
    this.isTeacher = user.role === 'admin';

    // Disconnect any existing peer session
    if (this.peer) {
      try {
        this.peer.destroy();
      } catch (e) {}
      this.peer = null;
    }

    try {
      const { default: Peer } = await import('peerjs');

      // Super Admin uses predictable Hub ID, students use random/user-specific ID
      const chosenPeerId = this.isTeacher 
        ? P2P_TEACHER_HUB_ID 
        : `aztlan-student-${user.id.replace(/[^a-zA-Z0-9_-]/g, '')}-${Math.floor(Math.random() * 1000)}`;

      this.peer = new Peer(chosenPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
          ]
        }
      });

      this.peer.on('open', (id: string) => {
        this.peerId = id;
        this.isConnected = true;
        this.emitStatus();

        // If student, proactively connect to Teacher Hub
        if (!this.isTeacher) {
          this.connectToTeacherHub();
        }
      });

      // Handle incoming connections
      this.peer.on('connection', (conn: any) => {
        this.handleNewConnection(conn);
      });

      this.peer.on('disconnected', () => {
        this.isConnected = false;
        this.emitStatus();
        // Reconnect after brief pause
        setTimeout(() => {
          if (this.peer && !this.peer.destroyed) {
            this.peer.reconnect();
          }
        }, 3000);
      });

      this.peer.on('error', (err: any) => {
        console.warn('[P2P WebRTC notice]:', err.type, err.message);
        // If teacher hub ID is taken (e.g. reload or multiple tabs), fallback to student or auto ID
        if (err.type === 'unavailable-id' && this.isTeacher) {
          const fallbackId = `${P2P_TEACHER_HUB_ID}-${Math.floor(Math.random() * 10000)}`;
          try {
            this.peer = new Peer(fallbackId);
          } catch (e) {}
        }
      });

    } catch (err) {
      console.warn('P2P initialization error:', err);
    }
  }

  private connectToTeacherHub(): void {
    if (!this.peer || this.isTeacher) return;

    try {
      const conn = this.peer.connect(P2P_TEACHER_HUB_ID, {
        reliable: true
      });

      conn.on('open', () => {
        this.connections.set(P2P_TEACHER_HUB_ID, conn);
        this.emitStatus();

        // Send handshake heartbeat
        conn.send({
          type: 'HEARTBEAT',
          userId: this.currentUser?.id || 'anonymous',
          studentName: this.currentUser?.name || 'Estudiante',
          timestamp: new Date().toISOString()
        });
      });

      conn.on('data', (data: any) => {
        this.handleReceivedData(data);
      });

      conn.on('close', () => {
        this.connections.delete(P2P_TEACHER_HUB_ID);
        this.emitStatus();
        // Retry connection to teacher hub after delay
        setTimeout(() => this.connectToTeacherHub(), 6000);
      });
    } catch (e) {
      console.warn('Failed connecting to teacher P2P hub:', e);
    }
  }

  private handleNewConnection(conn: any): void {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);
      this.emitStatus();
    });

    conn.on('data', (data: any) => {
      this.handleReceivedData(data);
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      this.emitStatus();
    });
  }

  private handleReceivedData(data: any): void {
    if (!data || !data.type) return;

    // Handle sync requests from teacher
    if (data.type === 'REQUEST_SYNC' && !this.isTeacher) {
      // Student sends their stored progress back to teacher
      try {
        const raw = localStorage.getItem('aztlan_plant_design_progress_v1');
        if (raw && this.currentUser) {
          const all = JSON.parse(raw);
          const myProgress = all[this.currentUser.id];
          if (myProgress) {
            this.broadcastProgress(myProgress, 'Sincronización P2P solicitada por el docente');
          }
        }
      } catch (e) {}
    }

    this.notifyListeners(data);
  }

  public broadcastProgress(progress: StudentProgress, summaryText?: string): void {
    if (!this.currentUser) return;

    const payload: P2PEventMessage = {
      type: 'PROGRESS_UPDATE',
      userId: this.currentUser.id,
      studentName: this.currentUser.name,
      progress,
      summaryText: summaryText || `Actualización de avance de ${this.currentUser.name}`,
      timestamp: new Date().toISOString()
    };

    // 1. Broadcast via local BroadcastChannel for all tabs
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {}
    }

    // 2. Broadcast via WebRTC DataChannel to all connected peers
    this.connections.forEach((conn) => {
      try {
        if (conn.open) {
          conn.send(payload);
        }
      } catch (e) {}
    });

    // 3. Also notify local listeners in current page
    this.notifyListeners(payload);
  }

  public requestAllStudentsSync(): void {
    const payload = {
      type: 'REQUEST_SYNC',
      userId: this.currentUser?.id || 'admin',
      studentName: 'Docente / Super Administrador',
      timestamp: new Date().toISOString()
    };

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {}
    }

    this.connections.forEach((conn) => {
      try {
        if (conn.open) {
          conn.send(payload);
        }
      } catch (e) {}
    });
  }

  public subscribe(listener: P2PListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public subscribeStatus(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    this.emitStatus();
    return () => this.statusListeners.delete(listener);
  }

  private notifyListeners(msg: P2PEventMessage): void {
    this.listeners.forEach((listener) => {
      try {
        listener(msg);
      } catch (e) {}
    });
  }

  private emitStatus(): void {
    const status = {
      connected: this.isConnected,
      peerCount: this.connections.size,
      peerId: this.peerId,
      mode: (this.isTeacher ? 'admin' : this.currentUser ? 'student' : 'idle') as 'admin' | 'student' | 'idle'
    };
    this.statusListeners.forEach((l) => {
      try {
        l(status);
      } catch (e) {}
    });
  }

  public getPeerId(): string {
    return this.peerId;
  }
}

// Global Singleton Instance
export const p2pManager = new P2PManager();
