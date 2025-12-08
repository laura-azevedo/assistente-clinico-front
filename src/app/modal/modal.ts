import { Input, Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal implements AfterViewInit, OnDestroy {
  @Input() title: string = 'Título default';

  constructor() {}

  @ViewChild('scrollable') scrollable!: ElementRef<HTMLDivElement>;
  @ViewChild('bottom') bottom!: ElementRef<HTMLDivElement>;
  
  private observer!: MutationObserver;

  ngAfterViewInit(): void {
    this.observer = new MutationObserver(() => {
      this.scrollToBottom();
    });

    this.observer.observe(this.scrollable.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  private scrollToBottom() {
    this.bottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
