import { Component, OnInit, ViewChild, NgZone, AfterViewInit } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';
import { FormsModule } from '@angular/forms';
import { Hipotese } from '../hipotese/hipotese';
import { Microphone } from '../shared/components/microphone/microphone';
import { CommonModule } from '@angular/common';
import { EntrevistaService } from './services/entrevista.service';
import { EntrevistaRequest, EntrevistaResponse } from './models/entrevista.model';
import { speak } from '../shared/utils/utils';
import { AppointmentStateService } from '../shared/services/appointment.service';
import { Timer } from '../shared/components/timer/timer';


@Component({
  selector: 'app-entrevista',
  standalone: true,
  imports: [CommonModule, Navbar, Header, Modal, FormsModule, Hipotese, Microphone, Timer],
  templateUrl: './entrevista.html',
  styleUrls: ['./entrevista.css']
})
export class Entrevista implements OnInit, AfterViewInit {
  @ViewChild(Navbar) navbar!: Navbar;
  @ViewChild(Microphone) microphone!: Microphone;

  public openWindow = false;
  public typedQuestion: string = '';
  public interviewHistory: { question: string; answer: string }[] = [];
  public waitingLLMResult = false;

  constructor( 
    private entrevistaService: EntrevistaService, 
    private appointmentState: AppointmentStateService
) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.microphone.send.subscribe((text: string) => {
      this.sendQuestion(text);
    });
  }

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  sendQuestion(question: string) { 
    console.log('SendQuestion: ', question);
    this.waitingLLMResult = true;

    const payload: EntrevistaRequest = {
      question,
      appointment_id: this.appointmentState.appointmentId
    }; 

    this.entrevistaService.enviarPergunta(payload).subscribe({
      next: ({ textAnswer, finish }: EntrevistaResponse) => {
        console.log('Resposta: ', textAnswer);
        this.interviewHistory.push({ question, answer: textAnswer });
        speak(textAnswer)

        this.waitingLLMResult = false;

        if (finish) {
          console.log('abriu')
          this.openWindow = true;
        }
      },
      error: err => {
        console.error('Erro - HTTP:', err);
        this.waitingLLMResult = false;
      }
    });
  }

  //TODO: ver dps
  sendTypedQuestion() {
    const question = this.typedQuestion.trim();
    if (question) {
      this.sendQuestion(question);
      this.typedQuestion = '';
    }
  }

  armazenarResposta(resposta: string) {
    console.log('Usuário respondeu:', resposta);
  }
}