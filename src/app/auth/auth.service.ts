import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { name: string; email: string; password: string; profile: string }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
