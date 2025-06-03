import { Component } from '@angular/core';
import { FormLogin } from './form-login/form-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLogin],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {}
