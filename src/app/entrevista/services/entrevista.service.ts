import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EntrevistaRequest, EntrevistaResponse } from '../models/entrevista.model';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
  constructor(private http: HttpClient) {}

  enviarPergunta(payload: EntrevistaRequest): Observable<EntrevistaResponse> {
    return this.http.post<EntrevistaResponse>(
      `${environment.apiUrl}/atendimento/entrevista`,
      payload
    );
  }
}
