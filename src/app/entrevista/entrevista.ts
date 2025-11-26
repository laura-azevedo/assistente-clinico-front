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
import { TimerGuardService } from '../shared/components/timer/guard/timerguard.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-entrevista',
  standalone: true,
  imports: [CommonModule, Navbar, Header, Modal, FormsModule, Hipotese, Microphone, Timer],
  templateUrl: './entrevista.html',
  styleUrls: ['./entrevista.css']
})
export class Entrevista implements OnInit, AfterViewInit {
  @ViewChild(Navbar) navbar!: Navbar;

  public openWindow = false;
  public typedQuestion: string = '';
  public interviewHistory: { question: string; answer: string }[] = [];
  public waitingLLMResult = false;

  constructor( 
    private entrevistaService: EntrevistaService, 
    private appointmentState: AppointmentStateService,
    private pageTimer: TimerGuardService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.pageTimer.startTimer(() => {
    this.openWindow = true;
     this.toastr.error('Seu tempo acabou!', 'Atenção', {
      positionClass: 'toast-top-right',
      timeOut: 4000,
    });

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
      next: ({ textAnswer }: EntrevistaResponse) => {
        console.log('Resposta: ', textAnswer);
        this.interviewHistory.push({ question, answer: textAnswer });
        speak(textAnswer)

        this.waitingLLMResult = false;

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

  openHypothesisModal(){
    this.openWindow = true
  }

  armazenarResposta(resposta: string) {
    console.log('Usuário respondeu:', resposta);
  }

  ngOnDestroy() {
    this.pageTimer.stopTimer();
  }
}