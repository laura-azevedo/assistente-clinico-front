import { Component } from '@angular/core';
import { BotaoCadastro } from '../../../shared/components/botao-cadastro/botao-cadastro';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-form-cadastro',
  imports: [BotaoCadastro, ReactiveFormsModule, CommonModule],
  templateUrl: './form-cadastro.html',
  styleUrl: './form-cadastro.css',
})


export class FormCadastro {

  cadastroForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      profile: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.authService.register(this.cadastroForm.value).subscribe({
        next: () => {
          this.successMessage = 'Cadastro realizado com sucesso! Redirecionando para o login...';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.detail || 'Erro ao cadastrar usuário. Por favor, tente novamente.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
      this.successMessage = '';
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
