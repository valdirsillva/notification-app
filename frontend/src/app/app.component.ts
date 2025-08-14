import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacao } from './models/notificacao.model';
import { NotificationManagerService } from './services/notification-manager.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Sistema de Notificações</h1>

      <app-notification-form
        [enviando]="(enviando$ | async)!"
        (enviarNotificacao)="onEnviarNotificacao($event)"
      ></app-notification-form>

      <app-notification-list
        [notificacoes]="(notificacoes$ | async)!"
      ></app-notification-list>

      <app-connection-status
        [conectado]="(conectado$ | async)!"
      ></app-connection-status>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }

      h1 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 30px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  notificacoes$: Observable<Notificacao[]>;
  enviando$: Observable<boolean>;
  conectado$: Observable<boolean>;

  constructor(private notificationManager: NotificationManagerService) {
    this.notificacoes$ = this.notificationManager.notificacoes$;
    this.enviando$ = this.notificationManager.enviando$;
    this.conectado$ = this.notificationManager.conectado$;
  }

  ngOnInit(): void {
    // Componente inicializado - serviços já estão configurados
  }

  onEnviarNotificacao(mensagem: string): void {
    this.notificationManager.enviarNotificacao(mensagem);
  }

  onObterStatusNotificacao(messageId: string): void {
    this.notificationManager.verificarStatusNotificacao(messageId);
  }
}
