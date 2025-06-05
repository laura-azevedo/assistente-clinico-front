import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-sair',
  imports: [],
  templateUrl: './botao-sair.html',
  styleUrl: './botao-sair.css'
})
export class BotaoSair {

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/'])
  }
}
