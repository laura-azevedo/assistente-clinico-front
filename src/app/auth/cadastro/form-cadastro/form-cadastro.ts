import { Component } from '@angular/core';
import { BotaoCadastro } from '../../../shared/components/botao-cadastro/botao-cadastro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cadastro',
  imports: [BotaoCadastro],
  templateUrl: './form-cadastro.html',
  styleUrl: './form-cadastro.css',
})


export class FormCadastro {

  constructor(private router: Router) {}

  goToLoginPage() {
    this.router.navigate(['/']);
  }
}
