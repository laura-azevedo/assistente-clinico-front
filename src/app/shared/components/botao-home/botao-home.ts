import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-home',
  imports: [],
  templateUrl: './botao-home.html',
  styleUrl: './botao-home.css'
})
export class BotaoHome {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/home'])
  }

}
