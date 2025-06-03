import { Component } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  standalone: true,
  styleUrls: ['./form-login.css']
})
export class FormLogin {
  usuario: string = '';
  senha: string = '';

  onSubmit() {
    console.log('Usuário:', this.usuario);
    console.log('Senha:', this.senha);
  }
}
