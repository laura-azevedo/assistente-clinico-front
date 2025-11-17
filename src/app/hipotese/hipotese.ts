import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Microphone } from '../shared/components/microphone/microphone';
import { HipoteseService } from './services/hipotese.service';
import { HipoteseRequest } from './models/hipotese.model';
import { speak } from '../shared/utils/utils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hipotese',
  standalone: true,
  imports: [CommonModule, FormsModule, Microphone],
  templateUrl: './hipotese.html',
  styleUrls: ['./hipotese.css']
})
export class Hipotese {
  @Input() isOpen: boolean = false;
  @Input() fase: 'entrevista' | 'exames' | 'exames-complementares' = 'entrevista';
  @Output() closed = new EventEmitter<void>();
  @Output() respostaEnviada = new EventEmitter<string>();
  
  @ViewChild(Microphone) microphone!: Microphone;

  hipotese: string = '';
  answerLLM: string = '';
  isAnswerSaved: boolean = false;
  isLoading: boolean = false;

  constructor(private hipoteseService: HipoteseService, private router: Router) {}

  onMicrophoneResult(text: string) {
    console.log('texto: ', text)
    this.hipotese = text;
  }

  private handleIntermediatePhase() {
    this.answerLLM = 'Sua resposta foi salva. A avaliação final ocorrerá após a etapa 3.';
    this.isAnswerSaved = true;

    setTimeout(() => {
      const next = this.fase === 'entrevista' ? '/exames' : '/exames-complementares';
      this.router.navigate([next]);
    }, 3000);
  }

  private evaluateFinalHypothesis() {
    const payload: HipoteseRequest = {
      etapa1: this.loadHypothesis('entrevista'),
      etapa2: this.loadHypothesis('exames'),
      etapa3: this.hipotese.trim()
    };

    this.answerLLM = 'Analisando sua resposta...';
    this.isLoading = true;

    this.hipoteseService.avaliarHipoteseFinal(payload).subscribe({
      next: (res) => {
        this.answerLLM = res.comment;
        speak(res.comment);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[Hipotese] Erro ao avaliar:', err);
        this.answerLLM = 'Erro ao avaliar hipótese.';
        this.isLoading = false;
      }
    });
  }

  private loadHypothesis(fase: string): string {
    return localStorage.getItem(`hipotese-${fase}`) || '';
  }

  private saveHipotese(fase: string, value: string) {
    localStorage.setItem(`hipotese-${fase}`, value);
  }

  sendAnswer() {
    const hipotese = this.hipotese.trim();
    if (!hipotese) return;

    this.saveHipotese(this.fase, hipotese);
    this.respostaEnviada.emit(hipotese);

    if (this.fase === 'entrevista') {
      const interview_id = localStorage.getItem('interview_id');

    if (interview_id) {
      this.hipoteseService.salvarHipoteseEntrevista(interview_id, hipotese).subscribe({
        next: () => console.log('Hipótese da entrevista salva no backend'),
        error: (err) => console.error('Erro ao salvar hipótese da entrevista:', err)
      });
    }
  }


    this.fase === 'exames-complementares'
      ? this.evaluateFinalHypothesis()
      : this.handleIntermediatePhase();
  }

  // TODO: implementar dps
  closeModal() {
    this.closed.emit();
    this.hipotese = '';
    this.answerLLM = '';
    this.isAnswerSaved = false;
    this.isLoading = false;
  }
}