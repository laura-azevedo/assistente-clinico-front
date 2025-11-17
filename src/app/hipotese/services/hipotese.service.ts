import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HipoteseRequest, HipoteseResponse } from '../models/hipotese.model';

@Injectable({
  providedIn: 'root'
})
export class HipoteseService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  salvarHipoteseEntrevista(interview_id: string, user_hypothesis: string): Observable<any> {
      console.log('[FRONT] Enviando para backend:', { interview_id, user_hypothesis });

    return this.http.post(`${this.baseUrl}/hypothesis/interview`, {
      interview_id,
      user_hypothesis,
    });
  }

  avaliarHipoteseFinal(payload: HipoteseRequest): Observable<HipoteseResponse> {
    return this.http.post<HipoteseResponse>(`${this.baseUrl}/evaluator`, payload);
  }
}
