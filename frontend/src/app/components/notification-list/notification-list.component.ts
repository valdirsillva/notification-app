import { Component, Input } from '@angular/core';
import { Notificacao } from '../../models/notificacao.model';

@Component({
  selector: 'app-notification-list',
  template: `
    <div class="notifications-section">
      <div class="header">
        <h2>Notificações ({{ notificacoes.length }})</h2>
        <button
          *ngIf="notificacoes.length > 0"
          (click)="onLimpar()"
          class="clear-btn"
        >
          Limpar Todas
        </button>
      </div>

      <div class="notifications-list">
        <app-notification-item
          *ngFor="let notificacao of notificacoes; trackBy: trackByMensagemId"
          [notificacao]="notificacao"
          (remover)="onRemover($event)"
        ></app-notification-item>

        <div *ngIf="notificacoes.length === 0" class="empty-state">
          <p>Nenhuma notificação enviada ainda.</p>
          <small
            >Digite uma mensagem acima e clique em "Enviar Notificação"</small
          >
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .notifications-section h2 {
        color: #2c3e50;
        margin: 0;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .clear-btn {
        padding: 8px 16px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .clear-btn:hover {
        background: #c82333;
      }

      .notifications-list {
        max-height: 500px;
        overflow-y: auto;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: #6c757d;
      }

      .empty-state p {
        margin: 0 0 10px 0;
        font-size: 16px;
      }

      .empty-state small {
        font-size: 14px;
        opacity: 0.8;
      }
    `,
  ],
})
export class NotificationListComponent {
  @Input() notificacoes: Notificacao[] = [];

  trackByMensagemId(index: number, item: Notificacao): string {
    return item.mensagemId;
  }

  onLimpar(): void {
    // Implementar através do serviço no componente pai
  }

  onRemover(mensagemId: string): void {
    // Implementar através do serviço no componente pai
  }
}
