import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-form',
  template: `
    <div class="form-section">
      <div class="input-group">
        <input
          type="text"
          [(ngModel)]="mensagem"
          placeholder="Digite o conteúdo da mensagem..."
          class="message-input"
          (keyup.enter)="onEnviar()"
          [disabled]="enviando"
        />
        <button
          (click)="onEnviar()"
          [disabled]="!mensagem.trim() || enviando"
          class="send-btn"
        >
          {{ enviando ? 'Enviando...' : 'Enviar Notificação' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .form-section {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
      }

      .input-group {
        display: flex;
        gap: 10px;
      }

      .message-input {
        flex: 1;
        padding: 12px;
        border: 2px solid #e9ecef;
        border-radius: 6px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s;
      }

      .message-input:focus {
        border-color: #007bff;
      }

      .message-input:disabled {
        background-color: #f8f9fa;
        cursor: not-allowed;
      }

      .send-btn {
        padding: 12px 24px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        white-space: nowrap;
      }

      .send-btn:hover:not(:disabled) {
        background: #0056b3;
      }

      .send-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }
    `,
  ],
})
export class NotificationFormComponent {
  @Input() enviando = false;
  @Output() enviarNotificacao = new EventEmitter<string>();

  mensagem = '';

  onEnviar(): void {
    if (this.mensagem.trim() && !this.enviando) {
      this.enviarNotificacao.emit(this.mensagem);
      this.mensagem = '';

      console.log(this.mensagem);
    }
  }
}
