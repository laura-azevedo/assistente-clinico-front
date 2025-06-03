import { Component } from '@angular/core';
import { BotaoLogin } from '../../../shared/components/botao-login/botao-login';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  standalone: true,
  styleUrls: ['./form-login.css'],
  imports: [BotaoLogin]
})
export class FormLogin {
  usuario: string = '';
  senha: string = '';

  onSubmit() {
    console.log('Usuário:', this.usuario);
    console.log('Senha:', this.senha);
  }
}
