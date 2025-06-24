import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-hipotese',

  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hipotese.html',
  styleUrls: ['./hipotese.css']
})
export class Hipotese {
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  hipotese = '';
  answerLLM = '';

  private recognition!: any;
  isListening: boolean = false;

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  sendAnswer() {
    if (!this.hipotese.trim()) return;

    this.answerLLM = 'Analisando sua resposta:';

    this.http.post<{ comment: string }>(
      `${environment.apiUrl}/atendimento/avaliar-hipotese`,
      { user_answer: this.hipotese.trim() }
    ).subscribe({
      next: (res) => {
        this.answerLLM = res.comment;
        this.playAudio(this.answerLLM);
      },
      error: (err) => {
        this.answerLLM = 'Erro ao avaliar hipótese.';
        console.error(err);
      }
    });
  }

  startListening() {
    if (!this.recognition) {
      this.setupSpeechRecognition();
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition?.stop();
  }

  private setupSpeechRecognition() {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('O Reconhecimento de voz não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognitionClass();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();

      this.ngZone.run(() => {
        this.hipotese = transcript;
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      this.stopListening();
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  private playAudio(texto: string) {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn('SpeechSynthesis não suportado');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
  }

  closeModal() {
    this.closed.emit();
    this.hipotese = '';
    this.answerLLM = '';
    this.stopListening();
  }
}
