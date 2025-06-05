import { Component } from '@angular/core';
import { BotaoSair } from '../botao-sair/botao-sair';
import { BotaoConfig } from '../botao-config/botao-config';

@Component({
  selector: 'app-header',
  imports: [BotaoConfig, BotaoSair],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
