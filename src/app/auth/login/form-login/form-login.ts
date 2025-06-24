import { Component } from '@angular/core';
import { BotaoLogin } from '../../../shared/components/botao-login/botao-login';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.html',
  standalone: true,
  styleUrls: ['./form-login.css'],
  imports: [BotaoLogin, ReactiveFormsModule, CommonModule]
})
export class FormLogin {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Teste 1')
    if (this.loginForm.valid) {
      console.log('Teste 2')
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/entrevista']);
        },
        error: (err) => {
          console.log('Teste 4')
          this.errorMessage = 'Email ou senha inválidos';
        }
      });
    }
    console.log('Teste 3')
  }

  goToRegisterPage() {
    this.router.navigate(['/cadastro']);
  }
}
