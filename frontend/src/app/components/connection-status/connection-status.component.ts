import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connection-status',
  template: `
    <div class="connection-status">
      <span [ngClass]="conectado ? 'connected' : 'disconnected'">
        {{ conectado ? '🟢 Conectado' : '🔴 Desconectado' }}
      </span>
    </div>
  `,
  styles: [
    `
      .connection-status {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 8px 12px;
        border-radius: 20px;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        z-index: 1000;
      }

      .connected {
        color: #28a745;
      }

      .disconnected {
        color: #dc3545;
      }
    `,
  ],
})
export class ConnectionStatusComponent {
  @Input() conectado = false;
}
