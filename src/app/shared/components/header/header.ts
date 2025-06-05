import { Component } from '@angular/core';
import { BotaoSair } from '../botao-sair/botao-sair';

@Component({
  selector: 'app-header',
  imports: [BotaoSair],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
