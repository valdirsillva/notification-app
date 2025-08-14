import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NotificacaoRequest,
  NotificacaoResponse,
} from '../models/notificacao.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  enviarNotificacao(
    request: NotificacaoRequest
  ): Observable<NotificacaoResponse> {
    return this.http
      .post<NotificacaoResponse>(`${this.apiUrl}/api/notificar`, request)
      .pipe(catchError(this.handleError));
  }

  verificarSaude(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/health`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;
    }

    console.error('Erro na API:', errorMessage);
    return throwError(() => errorMessage);
  }
}

// src/app/services/websocket.service.ts
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
