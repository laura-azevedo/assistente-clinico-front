import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HipoteseRequest, HipoteseResponse } from '../models/hipotese.model';

@Injectable({
  providedIn: 'root'
})
export class HipoteseService {
  private baseUrl = `${environment.apiUrl}/atendimento`;

  constructor(private http: HttpClient) {}

  avaliarHipoteseFinal(payload: HipoteseRequest): Observable<HipoteseResponse> {
    return this.http.post<HipoteseResponse>(`${this.baseUrl}/avaliar-hipotese-final`, payload);
  }
}
