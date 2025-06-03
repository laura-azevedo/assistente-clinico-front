import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Cadastro } from './auth/cadastro/cadastro';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'cadastro', component: Cadastro}
];
