import { Component, ViewChild } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';
import { Hipotese } from '../hipotese/hipotese';
import { CommonModule } from '@angular/common';
import examesData from '../../assets/exames/exames.json';
import type { ExameInfo } from './models/exame.model';
import { AppointmentStateService } from '../shared/services/appointment.service';
import { PhysicalExamService } from './services/exames.service';

@Component({
  selector: 'app-exames',
  imports: [Navbar, Header, Modal, Hipotese, CommonModule],
  templateUrl: './exames.html',
  styleUrls: ['./exames.css']
})
export class Exames {
  @ViewChild(Navbar) navbar!: Navbar;

  isOpened = false;

  messages: string[] = [];
  enableButton = false;

  examesData = examesData as Record<string, ExameInfo>;
  
  constructor(
    private appointmentState: AppointmentStateService,
    private physicalExamService: PhysicalExamService
  ){}

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  openModal(): void {
    this.isOpened = true;
  }

  clickExame(exame: string) {
    const key = exame.trim().toLowerCase();
    const info: ExameInfo = this.examesData[key];

    this.enableButton = true;

    this.messages.push(`Exame selecionado: ${exame}`);

    this.messages.push(info.mensagem);

    if (info.audio) {
      const audio = new Audio(`${info.audio}`);
      audio.volume = 1.0;
      audio.play();
    }

    if (this.appointmentState.appointmentId) {
      const payload = {
        appointment_id: this.appointmentState.appointmentId,
        exam_name: exame,
        result_text: info.mensagem
      };

      this.physicalExamService.savePhysicalExam(payload).subscribe({
        next: res => console.log('Exame salvo com sucesso:', res),
        error: err => console.error('Erro ao salvar exame:', err)
      });
    } else {
      console.error('appointment_id não definido (AppointmentStateService)');
    }
  
  }
}