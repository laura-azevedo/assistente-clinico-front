import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService, RemainingTime } from './services/timer.service'; // Assumindo que o serviço está no mesmo diretório ou caminho correto
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { getProgressColor } from '../../utils/utils';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.html',
  imports: [CommonModule],
  styleUrls: ['./timer.css']
})
export class Timer implements OnInit, OnDestroy {
  targetDate: Date = new Date();
  remainingTime: RemainingTime = { minutes: '08', seconds: '00' };
  progress: number = 100;
  progressColor: string = '#0D334D'
  private subscription: Subscription = new Subscription();
  private readonly initialDurationInMs = 8 * 60 * 1000;
  isBlinking: boolean = false;

  constructor(private timerService: TimerService) { }

  ngOnInit(): void {
    this.targetDate = new Date(new Date().getTime() + this.initialDurationInMs);

    this.subscription = interval(1000)
      .pipe(
        takeWhile(() => {
          const now = new Date().getTime();
          const target = this.targetDate.getTime();
          return (target - now) > -1000;
        })
      )
      .subscribe(() => {
        this.updateTimer();
      });
    this.updateTimer();
  }
 
  private updateTimer(): void {
    const remaining = this.timerService.getRemainingTime(this.targetDate);
    this.remainingTime = remaining;
    const now = new Date().getTime();
    const timeDifferenceInMs = this.targetDate.getTime() - now;

    if (timeDifferenceInMs <= 0) {
      this.progress = 0;
      this.subscription.unsubscribe(); 
      return;
    }

    const totalSecondsRemaining = parseInt(remaining.minutes) * 60 + parseInt(remaining.seconds);

    this.progress = (timeDifferenceInMs / this.initialDurationInMs) * 100;
    this.progressColor = getProgressColor(this.progress);
    this.isBlinking = totalSecondsRemaining <= 30;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}