import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-config',
  imports: [],
  templateUrl: './botao-config.html',
  styleUrl: './botao-config.css'
})
export class BotaoConfig {

  constructor(private router: Router) {}

  goToCaseConfig(): void {
    this.router.navigate(['/configuracao-caso'])
  }

}
