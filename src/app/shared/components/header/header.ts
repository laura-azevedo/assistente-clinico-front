import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoSair } from '../botao-sair/botao-sair';
import { BotaoConfig } from '../botao-config/botao-config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BotaoConfig, BotaoSair],
  templateUrl: './header.html'
})
export class Header {
  @Output() menuClick = new EventEmitter<void>();
}
