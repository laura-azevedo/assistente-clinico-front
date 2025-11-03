import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ExameComplementar } from '../models/exames-complementares.model';

@Injectable({
  providedIn: 'root'
})
export class ExameComplementarService {

  constructor(private http: HttpClient) {}

  solicitarExame(exame: string, id_atendimento: string): Observable<ExameComplementar> {
    return this.http.post<ExameComplementar>(`${environment.apiUrl}/atendimento/exame-complementar`, { exame, id_atendimento });
  }
}
