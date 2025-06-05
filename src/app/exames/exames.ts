import { Component, ViewChild } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-exames',
  imports: [Navbar, Header],
  templateUrl: './exames.html',
  styleUrl: './exames.css'
})
export class Exames {

  @ViewChild(Navbar) navbar!: Navbar;

  toggleNavbar(): void {
    this.navbar.toggle();
  }

}
