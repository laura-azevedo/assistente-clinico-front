import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';
import { Microphone } from '../shared/components/microphone/microphone';
import { Hipotese } from '../hipotese/hipotese';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExameComplementarService } from './services/exames-complementares.service';
import { ExameComplementar } from './models/exames-complementares.model';
import { speak } from '../shared/utils/utils';
import { AppointmentStateService } from '../shared/services/appointment.service';
import examesDataImported from '../../assets/exames/exames-complementares.json';

@Component({
  selector: 'app-exames-complementares',
  standalone: true,
  imports: [Navbar, Header, Modal, Microphone, Hipotese, CommonModule, FormsModule],
  templateUrl: './exames-complementares.html',
  styleUrls: ['./exames-complementares.css']
})
export class ExamesComplementares implements AfterViewInit {
  @ViewChild(Modal) modal!: Modal;
  @ViewChild(Navbar) navbar!: Navbar;
  @ViewChild(Microphone) microphone!: Microphone;

  examInput = '';
  isOpened = false;
  history: ExameComplementar[] = [];
  enabledButton = false;

  examesData = examesDataImported as ExameComplementar[];

  constructor(
    private examesService: ExameComplementarService,
    private appointmentState: AppointmentStateService
  ) {}

  ngAfterViewInit() {
    this.microphone.send.subscribe((text: string) => {
      this.examInput = text;
      this.submitExamInput();
    });
  }

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  startMic(){
    this.microphone.startListening();
  }

  submitExamInput() {
    const exam = this.examInput.trim();
    if (!exam) return;

    this.processExamRequest(exam);
    this.examInput = '';
  }

  private normalizeKey(s: string): string {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  private hasReachedExamLimit(): boolean {
    const validExams = this.history.filter(item => item.description !== 'Exame não reconhecido.');
    return validExams.length >= 4;
  }

  private isDuplicateExam(exam: string): boolean {
    const normalizedExam = this.normalizeKey(exam);
    return this.history.some(item => this.normalizeKey(item.name) === normalizedExam);
  }

  private findExamInJson(exam: string): ExameComplementar | undefined {
    const normalizedExam = this.normalizeKey(exam);
    return this.examesData.find(e => this.normalizeKey(e.name) === normalizedExam);
  }

  private addExamToHistory(exam: ExameComplementar) {
    this.history.push(exam);
    this.updateEnabledButton();
  }

  private sendExamToBackend(exam: ExameComplementar) {
    if (!this.appointmentState.appointmentId) {
      console.error('appointment_id não definido (AppointmentStateService)');
      return;
    }

    const payload = {
      appointment_id: this.appointmentState.appointmentId,
      exame: exam.name,
      result_text: exam.description
    };

    this.examesService.solicitarExame(payload).subscribe({
      next: res => console.log('Exame salvo com sucesso:', res),
      error: err => console.error('Erro ao salvar exame complementar:', err)
    });
  }

  private updateEnabledButton() {
    const validExamsCount = this.history.filter(
      item => item.description && item.description !== 'Exame não reconhecido.'
    ).length;
    this.enabledButton = validExamsCount > 0;
  }


  private processExamRequest(exam: string) {
    if (this.hasReachedExamLimit()) {
      alert('Você já solicitou o máximo de 4 exames.');
      return;
    }

    if (this.isDuplicateExam(exam)) {
      alert(`O exame "${exam}" já foi solicitado.`);
      return;
    }

    const info = this.findExamInJson(exam);

    const exame: ExameComplementar = {
      name: exam,
      description: info?.description ?? 'Exame não reconhecido.',
      image: info?.image
    };

    this.addExamToHistory(exame);
    speak(exame.description);
    this.sendExamToBackend(exame);
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }
}