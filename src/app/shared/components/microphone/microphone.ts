import { Component, NgZone, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.html',
  styleUrls: ['./microphone.css']
})
export class Microphone {
  @Output() send = new EventEmitter<string>();

  private recognition!: any;
  public isListening = false;

  constructor(private ngZone: NgZone) {
    this.setupSpeechRecognition();
  }

  setupSpeechRecognition() {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('O reconhecimento de voz não é suportado neste navegador.');
      return;
    }

    this.recognition = new SpeechRecognitionClass();
    this.recognition.lang = 'pt-BR';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      this.ngZone.run(() => {
        this.send.emit(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      this.ngZone.run(() => {
        this.isListening = false;
      });
    };

    this.recognition.onend = () => {
      this.ngZone.run(() => {
        this.isListening = false;
        console.log('Reconhecimento de voz finalizado.');
      });
    };
  }

  startListening() {
    console.log('Estou ouvindo!!')
    if (!this.recognition) {
      this.setupSpeechRecognition();
    }
    this.isListening = true;
    this.recognition.start();
  }
}
