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

    this.examInput = '';
    this.processExamRequest(exam);
  }

  private normalizeKey(s: string): string {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\.+$/g, '').toLowerCase().trim();
  }

  private hasReachedExamLimit(): boolean {
    const validExams = this.history.filter(item => item.description !== 'Exame não reconhecido.');
    return validExams.length >= 5;
  }

  private isDuplicateExam(exam: string): boolean {
    const normalizedExam = this.normalizeKey(exam);
    return this.history.some(item => this.normalizeKey(item.name) === normalizedExam);
  }

  private addExamToHistory(exam: ExameComplementar) {
    this.history.push(exam);
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

  private findExamInText(input: string): ExameComplementar | undefined {
  const inputWords = this.getNormalizedWords(input);
  console.log('INPUT WORDS: ', inputWords)
  if (inputWords.length === 0) return undefined;

  const matchedExams = this.examesData.filter(exam => 
    this.isExamInInput(exam, inputWords)
  );

  console.log('MATCHED EXAMS: ', matchedExams)

  if (matchedExams.length === 0) return undefined;

  return this.getMostSpecificExam(matchedExams);
}

  private getNormalizedWords(text: string): string[] {
    return this.normalizeKey(text)
              .split(/\s+/)
              .filter(word => word.length > 0);
  }

  private isExamInInput(exam: ExameComplementar, inputWords: string[]): boolean {
    const examWords = this.getNormalizedWords(exam.name);
    return this.isOrderedSubsequence(examWords, inputWords);
  }

  private isOrderedSubsequence(examWords: string[], inputWords: string[]): boolean {
    if (examWords.length === 0) return false;

    let currentInputIndex = -1;

    return examWords.every(examWord => {
      const foundIndex = inputWords.indexOf(examWord, currentInputIndex + 1);
      if (foundIndex === -1) return false;
      currentInputIndex = foundIndex;
      return true;
    });
  }

  private getMostSpecificExam(exams: ExameComplementar[]): ExameComplementar {
    console.log('EXAMES - getMostSpecificExam: ', exams)
    return exams.reduce((prev, curr) => {
      const prevLength = prev.name.split(/\s+/).length;
      const currLength = curr.name.split(/\s+/).length;
      return currLength > prevLength ? curr : prev;
    });
  }


  private processExamRequest(exam: string) {
    if (this.hasReachedExamLimit()) {
      alert('Você já solicitou o máximo de 5 exames.');
      return;
    }

    if (this.isDuplicateExam(exam)) {
      alert(`O exame "${exam}" já foi solicitado.`);
      return;
    }

    const info = this.findExamInText(exam);

    const exame: ExameComplementar = {
      name: exam,
      description: info === undefined 
                ? 'Exame não reconhecido.'
                : info.description,
      image: info?.image
    };


    this.addExamToHistory(exame);
    if (exame.description != null) speak(exame.description);
    this.sendExamToBackend(exame);
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }
}