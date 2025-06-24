import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Hipotese } from '../hipotese/hipotese';

@Component({
  selector: 'app-entrevista',
  standalone: true,
  imports: [Navbar, Header, Modal, FormsModule, Hipotese],
  templateUrl: './entrevista.html',
  styleUrls: ['./entrevista.css']
})
export class Entrevista implements OnInit {
  @ViewChild(Navbar) navbar!: Navbar;

  private recognition!: any;
  private isListening: boolean = false;
  private finished: boolean = false;
  private idInterview!: string;
  public openWindow = false;


  typedQuestion: string = '';

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) {
    this.idInterview = uuidv4();
  }

  ngOnInit() {
    this.setupSpeechRecognition();
  }

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  setupSpeechRecognition() {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('O Speech Recognition não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognitionClass();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log('Transcrição:::', transcript);

      this.ngZone.run(() => {
        this.sendQuestion(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento da voz:', event.error);
    };

    this.recognition.onend = () => {
      if (!this.finished && this.isListening) {
        this.recognition.start();
      }
    };
  }

  startListening() {
    if (!this.recognition) {
      console.log('Testando 1')
      this.setupSpeechRecognition();
    }

    this.isListening = true;
    this.finished = false;
    this.recognition.start();
    console.log('------ Início - reconhecimento de vooz');
  }

  sendQuestion(pergunta: string) {
    const payload = {
      pergunta: pergunta,
      id_atendimento: this.idInterview
    };

    this.http
    .post<{ textAnswer: string; finish: boolean }>(`${environment.apiUrl}/atendimento/entrevista`, payload)
    .subscribe({
      next: ({ textAnswer, finish }) => {
      this.textToSpeechConverter(textAnswer);

      if (finish) {
        this.finished  = true;
        this.isListening = false;
        this.recognition?.stop();
        this.openWindow = true;

      }
    },
    error: err => console.error('Erro - HTTP:', err)
  });

  }

  sendTypedQuestion() {
    const question = this.typedQuestion.trim();
    if (question) {
      this.sendQuestion(question);
      this.typedQuestion = '';
    }
  }

  textToSpeechConverter(texto: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    console.log('UTTERANCE: ', utterance)
    synth.speak(utterance);
  }

  closeWindow() {
    this.openWindow = false;
    this.router.navigate(['/exames']);
  }
}