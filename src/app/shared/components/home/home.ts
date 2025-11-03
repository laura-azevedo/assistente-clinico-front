import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @ViewChild(Navbar) navbar!: Navbar;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleNavbar(): void {
    this.navbar.toggle();
  }

  goToEntrevista() {
    this.router.navigate(['/entrevista']);
  }
}
