import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppointmentStateService {
  private _appointmentId: string | null = null;

  set appointmentId(id: string) {
    this._appointmentId = id;
  }

  get appointmentId(): string {
    if (!this._appointmentId) throw new Error('Appointment ID não definido!');
    return this._appointmentId;
  }
}
