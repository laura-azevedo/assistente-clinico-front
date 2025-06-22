import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() title: string = 'Título padrão';
  @Input() fase: string = '';

  mensagens: string[] = [];

  click(exame: string) {
    this.mensagens.push(`Exame selecionado: ${exame}`);
    if(exame === 'cardiovascular'){
      this.mensagens.push("O exame do precórdio (cardiovascular) do paciente indica que é ritmo cardíaco  regular, em três tempos (B4), sem sopros.")
      const audio = new Audio('/assets/exames/ausculta.MP3');
      audio.volume = 1.0
      audio.play();
      return;

    }
    if (exame === 'pulmões') {
            this.mensagens.push("O exame do aparelho respiratório do paciente apresenta murmúrio vesicular universalmente audível, sem ruídos adventícios.")
      return;
    }

    if (exame === 'abdome') {
      this.mensagens.push('O exame do abdome do paciente apresenta ruídos hidroaéreos universalmente audíveis, abdome indolor à palpação, sem massas ou visceromegalias.')
      return;
    }

    if (exame === 'Pressão arterial/frequência cardíaca') {
      this.mensagens.push('O auxiliar mediu a pressão arterial (PA) do senhor José. O valor foi 170/80 mmHg, a frequência cardíaca foi de 98bpm e a frequência respiratória foi de 24 irpm. A saturação de oxigênio na oximetria digital foi de 94% em ar ambiente.')
      return;
    }
  }

  // p fazer teste
  // mockHistorico = Array.from({ length: 20 }, (_, i) => ({
  //   titulo: `Pergunta ${i + 1}`,
  //   descricao: `Resposta fornecida para a pergunta ${i + 1}.`
  // }));
}
