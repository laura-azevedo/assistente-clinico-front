import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PhysicalExamService {
  constructor(private http: HttpClient) {}

  savePhysicalExam(payload: { appointment_id: string; exam_name: string; result_text?: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.apiUrl}/physical-exam`, payload, {headers}
    );
  }
}
