import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Cadastro } from './auth/cadastro/cadastro';
import { Entrevista } from './entrevista/entrevista';
import { Exames } from './exames/exames';
import { ExamesComplementares } from './exames-complementares/exames-complementares';
import { CasoConfig } from './caso-config/caso-config';
import { Hipotese } from './hipotese/hipotese';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro },
  { path: 'entrevista', component: Entrevista, canActivate: [AuthGuard] },
  { path: 'exames', component: Exames, canActivate: [AuthGuard]},
  { path: 'exames-complementares', component: ExamesComplementares, canActivate: [AuthGuard]},
  { path: 'configuracao-caso', component: CasoConfig, canActivate: [AuthGuard] },
  { path: 'entrevista/hipotese', component: Hipotese, canActivate: [AuthGuard]}
];
