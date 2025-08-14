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

  verificarStatus(
    mensagemId: string
  ): Observable<{ mensagemId: string; status: string }> {
    return this.http
      .get<{ mensagemId: string; status: string }>(
        `${this.apiUrl}/api/notificacao/status/${mensagemId}`
      )
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
