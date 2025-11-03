import { Input, Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() title: string = 'Título default';

  constructor() {}
}
