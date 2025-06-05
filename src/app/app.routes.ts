import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Cadastro } from './auth/cadastro/cadastro';
import { Entrevista } from './entrevista/entrevista';
import { Exames } from './exames/exames';
import { ExamesComplementares } from './exames-complementares/exames-complementares';
import { CasoConfig } from './caso-config/caso-config';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'entrevista', component: Entrevista },
  { path: 'exames', component: Exames},
  { path: 'exames-complementares', component: ExamesComplementares},
  { path: 'configuracao-caso', component: CasoConfig }
];
