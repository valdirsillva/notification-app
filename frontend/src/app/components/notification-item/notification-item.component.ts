import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notificacao } from '../../models/notificacao.model';

@Component({
  selector: 'app-notification-item',
  template: `
    <div class="notification-item" [ngClass]="'status-' + notificacao.status">
      <div class="notification-header">
        <span class="message-id"
          >ID: {{ notificacao.mensagemId.substring(0, 8) }}...</span
        >
        <div class="header-actions">
          <span class="status-badge" [ngClass]="'badge-' + notificacao.status">
            {{ getStatusText(notificacao.status) }}
          </span>
          <button
            (click)="onRemover()"
            class="remove-btn"
            title="Remover notificação"
          >
            ×
          </button>
        </div>
      </div>

      <div class="notification-content">
        <p>{{ notificacao.messageContent }}</p>
      </div>

      <div class="notification-footer">
        <small>{{
          notificacao.timestamp | date : 'dd/MM/yyyy HH:mm:ss'
        }}</small>
        <div
          class="status-indicator"
          [ngClass]="'indicator-' + notificacao.status"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .notification-item {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        animation: slideIn 0.3s ease-out;
      }

      .notification-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .notification-item.status-enviando {
        border-left: 4px solid #ffc107;
      }

      .notification-item.status-processando {
        border-left: 4px solid #17a2b8;
      }

      .notification-item.status-enviada {
        border-left: 4px solid #28a745;
      }

      .notification-item.status-erro {
        border-left: 4px solid #dc3545;
      }

      .notification-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .message-id {
        font-family: monospace;
        font-size: 12px;
        color: #6c757d;
        background: #f8f9fa;
        padding: 2px 6px;
        border-radius: 4px;
      }

      .status-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .badge-enviando {
        background: #fff3cd;
        color: #856404;
      }

      .badge-processando {
        background: #d1ecf1;
        color: #0c5460;
      }

      .badge-enviada {
        background: #d4edda;
        color: #155724;
      }

      .badge-erro {
        background: #f8d7da;
        color: #721c24;
      }

      .remove-btn {
        background: transparent;
        border: none;
        font-size: 18px;
        font-weight: bold;
        color: #6c757d;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .remove-btn:hover {
        background: #dc3545;
        color: white;
      }

      .notification-content p {
        margin: 0;
        color: #2c3e50;
        line-height: 1.5;
      }

      .notification-footer {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #e9ecef;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .notification-footer small {
        color: #6c757d;
      }

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .indicator-enviando {
        background: #ffc107;
        animation: pulse 1.5s infinite;
      }

      .indicator-processando {
        background: #17a2b8;
        animation: pulse 1.5s infinite;
      }

      .indicator-enviada {
        background: #28a745;
      }

      .indicator-erro {
        background: #dc3545;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class NotificationItemComponent {
  @Input() notificacao!: Notificacao;
  @Output() remover = new EventEmitter<string>();

  getStatusText(status: Notificacao['status']): string {
    const statusMap = {
      enviando: 'Enviando',
      aguardandoProcessamento: 'Aguardando processamento',
      enviada: 'Enviada',
      erro: 'Erro',
    };
    return statusMap[status] || status;
  }

  onRemover(): void {
    this.remover.emit(this.notificacao.mensagemId);
  }
}
