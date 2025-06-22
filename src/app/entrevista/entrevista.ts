import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-entrevista',
  standalone: true,
  imports: [Navbar, Header, Modal, FormsModule],
  templateUrl: './entrevista.html',
  styleUrls: ['./entrevista.css']
})
export class Entrevista implements OnInit {
  @ViewChild(Navbar) navbar!: Navbar;

  private recognition!: any;
  private isListening: boolean = false;
  private encerrado: boolean = false;
  private idAtendimento!: string;

  typedQuestion: string = '';

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.idAtendimento = uuidv4();
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
      console.log('Transcrição:', transcript);

      this.ngZone.run(() => {
        this.sendQuestion(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento:', event.error);
    };

    this.recognition.onend = () => {
      if (!this.encerrado && this.isListening) {
        this.recognition.start();
      }
    };
  }

  startListening() {
    if (!this.recognition) {
      this.setupSpeechRecognition();
    }

    this.isListening = true;
    this.encerrado = false;
    this.recognition.start();
    console.log('Início - reconhecimento de vooz');
  }

  sendQuestion(pergunta: string) {
    const payload = {
      pergunta: pergunta,
      id_atendimento: this.idAtendimento
    };

    this.http
    .post<{ resposta: string; encerrar: boolean }>(`${environment.apiUrl}/atendimento/entrevista`, payload)
    .subscribe({
      next: ({ resposta, encerrar }) => {
      this.textToSpeechConverter(resposta);

      if (encerrar) {
        this.encerrado  = true;
        this.isListening = false;
        this.recognition?.stop();
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
}