import { Component, ViewChild } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-entrevista',
  imports: [Navbar, Header, Modal],
  templateUrl: './entrevista.html',
  styleUrl: './entrevista.css'
})
export class Entrevista {

  @ViewChild(Navbar) navbar!: Navbar;

  toggleNavbar(): void {
    this.navbar.toggle();
  }


}
