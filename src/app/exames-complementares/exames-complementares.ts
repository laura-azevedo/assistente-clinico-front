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

  constructor(private examesService: ExameComplementarService) {}

  ngAfterViewInit() {
    this.microphone.send.subscribe((text: string) => {
      this.examInput = text;
      this.submitExamInput();
    });
  }

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  submitExamInput() {
    const exam = this.examInput.trim();
    if (!exam) return;

    this.sendExam(exam);
    this.examInput = '';
  }

  sendExam(exam: string) {
    if (!exam) return;

    const validExamsCount = this.history.filter(item => item.answer !== 'Exame não reconhecido.').length;
    if (validExamsCount >= 4) {
      alert('Você já solicitou o máximo de 4 exames.');
      return;
    }

    const duplicatedExam = this.history.some(item => item.question === exam);
    if (duplicatedExam) {
      alert(`O exame "${exam}" já foi solicitado.`);
      return;
    }

    this.examesService.solicitarExame(exam, 'teste').subscribe({
      next: (res) => this.handleExamResponse(res, exam),
      error: () => this.handleExamError(exam)
    });
  }

  private handleExamResponse(res: any, exam: string) {
    const item: ExameComplementar = { question: exam, answer: '', image: undefined };

    if (res.imagem) {
      item.image = res.imagem;
      item.answer = res.descricao || 'Imagem carregada.';
    } else if (res.resposta) {
      item.answer = res.resposta;
      speak(res.resposta);
    } else {
      item.answer = 'Exame não reconhecido.';
    }

    this.history.push(item);

    const validExamsCount = this.history.filter(item => item.answer !== 'Exame não reconhecido.').length;
    this.enabledButton = validExamsCount > 0;
  }

  private handleExamError(exam: string) {
    const item: ExameComplementar = {
      question: exam,
      answer: 'Erro ao consultar o exame no servidor.'
    };
    this.history.push(item);
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }
}