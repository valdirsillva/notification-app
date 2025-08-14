export interface Notificacao {
  mensagemId: string;
  messageContent: string;
  status: 'enviando' | 'aguardandoProcessamento' | 'enviada' | 'erro';
  timestamp: Date;
}

export interface NotificacaoRequest {
  mensagemId: string;
  messageContent: string;
}

export interface NotificacaoResponse {
  mensagem: string;
  mensagemId: string;
  timestamp: string;
}

export interface StatusUpdate {
  mensagemId: string;
  status: 'aguardandoProcessamento' | 'enviada' | 'erro';
}
