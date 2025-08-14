import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Notificacao, NotificacaoRequest } from '../models/notificacao.model';
import { NotificationApiService } from './notification-api.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationManagerService {
  private notificacoesSubject = new BehaviorSubject<Notificacao[]>([]);
  private enviandoSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: NotificationApiService,
    private websocketService: WebsocketService
  ) {
    this.setupWebSocketListener();
  }

  private setupWebSocketListener(): void {
    this.websocketService.statusUpdate$.subscribe((update) => {
      if (update) {
        this.atualizarStatusNotificacao(update.mensagemId, update.status);
      }
    });
  }

  get notificacoes$(): Observable<Notificacao[]> {
    return this.notificacoesSubject.asObservable();
  }

  get enviando$(): Observable<boolean> {
    return this.enviandoSubject.asObservable();
  }

  get conectado$(): Observable<boolean> {
    return this.websocketService.conectado$;
  }

  async enviarNotificacao(messageContent: string): Promise<void> {
    if (!messageContent.trim() || this.enviandoSubject.value) {
      return;
    }

    const mensagemId = uuidv4();
    const novaNotificacao: Notificacao = {
      mensagemId,
      messageContent: messageContent.trim(),
      status: 'enviando',
      timestamp: new Date(),
    };

    // Adiciona a notificação na lista
    this.adicionarNotificacao(novaNotificacao);
    this.enviandoSubject.next(true);

    try {
      const request: NotificacaoRequest = {
        mensagemId,
        messageContent: messageContent.trim(),
      };

      await this.apiService.enviarNotificacao(request).toPromise();
      this.atualizarStatusNotificacao(mensagemId, 'aguardandoProcessamento');
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      this.atualizarStatusNotificacao(mensagemId, 'erro');
    } finally {
      this.enviandoSubject.next(false);
    }
  }

  verificarStatusNotificacao(mensagemId: string): void {
    this.apiService.verificarStatus(mensagemId).subscribe({
      next: (res) => {
        if (res && res.status) {
          this.atualizarStatusNotificacao(
            mensagemId,
            res.status as Notificacao['status']
          );
        }
      },
      error: (err) => {
        console.error(
          `Erro ao consultar status da mensagem ${mensagemId}:`,
          err
        );
      },
    });
  }

  private adicionarNotificacao(notificacao: Notificacao): void {
    const notificacoes = this.notificacoesSubject.value;
    this.notificacoesSubject.next([notificacao, ...notificacoes]);
  }

  private atualizarStatusNotificacao(
    mensagemId: string,
    novoStatus: Notificacao['status']
  ): void {
    const notificacoes = this.notificacoesSubject.value.map((notificacao) =>
      notificacao.mensagemId === mensagemId
        ? { ...notificacao, status: novoStatus }
        : notificacao
    );
    this.notificacoesSubject.next(notificacoes);
  }

  limparNotificacoes(): void {
    this.notificacoesSubject.next([]);
  }

  removerNotificacao(mensagemId: string): void {
    const notificacoes = this.notificacoesSubject.value.filter(
      (n) => n.mensagemId !== mensagemId
    );
    this.notificacoesSubject.next(notificacoes);
  }
}
