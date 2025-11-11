import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ExameComplementar } from '../models/exames-complementares.model';

@Injectable({
  providedIn: 'root'
})
export class ExameComplementarService {

  constructor(private http: HttpClient) {}

  solicitarExame(payload: { appointment_id: string; exame: string; result_text?: string; result_image?: any })
  : Observable<ExameComplementar> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ExameComplementar>(
      `${environment.apiUrl}/complementary-exam`,
      payload,
      { headers }
    );  
  }
}
