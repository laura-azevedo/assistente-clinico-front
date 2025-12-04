import { Component, EventEmitter, Output } from '@angular/core';
import { BotaoSair } from '../botao-sair/botao-sair';
import { BotaoConfig } from '../botao-config/botao-config';
import { BotaoHome } from '../botao-home/botao-home';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BotaoHome, BotaoSair],
  templateUrl: './header.html'
})
export class Header {
  @Output() menuClick = new EventEmitter<void>();
}
