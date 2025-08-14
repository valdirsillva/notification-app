import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { StatusUpdate } from '../models/notificacao.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket!: Socket;
  private conectadoSubject = new BehaviorSubject<boolean>(false);
  private statusUpdateSubject = new BehaviorSubject<StatusUpdate | null>(null);

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket(): void {
    this.socket = io(environment.apiUrl);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.socket.on('connect', () => {
      console.log('WebSocket conectado');
      this.conectadoSubject.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket desconectado');
      this.conectadoSubject.next(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Erro de conexão WebSocket:', error);
      this.conectadoSubject.next(false);
    });

    this.socket.on('notificacao-status', (data: StatusUpdate) => {
      this.statusUpdateSubject.next(data);
    });
  }

  get conectado$(): Observable<boolean> {
    return this.conectadoSubject.asObservable();
  }

  get statusUpdate$(): Observable<StatusUpdate | null> {
    return this.statusUpdateSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Método para testar conectividade
  ping(): void {
    this.socket.emit('ping');
  }
}
