import { Component } from '@angular/core';
import { BotaoLogin } from '../../../shared/components/botao-login/botao-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  standalone: true,
  styleUrls: ['./form-login.css'],
  imports: [BotaoLogin]
})
export class FormLogin {

  constructor(private router: Router) {}

  goToRegisterPage() {
    this.router.navigate(['/cadastro']);
  }
  usuario: string = '';
  senha: string = '';

  onSubmit() {
    console.log('Usuário:', this.usuario);
    console.log('Senha:', this.senha);
  }
}
