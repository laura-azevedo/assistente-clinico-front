import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AppointmentStateService } from '../../services/appointment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @ViewChild(Navbar) navbar!: Navbar;

  constructor(private router: Router, private http: HttpClient, private appointmentState: AppointmentStateService) {}

  ngOnInit() {}

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  async startAppointment() {
  try {
    const token = localStorage.getItem('token');
    console.log('O TOKEN É: ', localStorage.getItem('token'));
    const res: any = await this.http.post(
      `${environment.apiUrl}/entrevista/start`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).toPromise();

    this.appointmentState.appointmentId = res.appointment_id;
    this.router.navigate(['/entrevista']);
  } catch (err) {
    console.error('Erro ao iniciar atendimento', err);}
  }
}
