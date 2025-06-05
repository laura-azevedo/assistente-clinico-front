import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Navbar } from '../shared/components/navbar/navbar';

@Component({
  selector: 'app-exames-complementares',
  imports: [Navbar, Header],
  templateUrl: './exames-complementares.html',
  styleUrl: './exames-complementares.css'
})
export class ExamesComplementares {

}
