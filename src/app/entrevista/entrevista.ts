import { Component } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-entrevista',
  imports: [Navbar, Header],
  templateUrl: './entrevista.html',
  styleUrl: './entrevista.css'
})
export class Entrevista {

}
