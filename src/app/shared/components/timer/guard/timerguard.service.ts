import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerGuardService {
  private timerId: any;
  private interviewTimeLimit = 8*60*1000;

  startTimer(onExpire: () => void) {
    const interviewStartTime = Date.now();

    this.timerId = setInterval(() => {
      if (Date.now() - interviewStartTime > this.interviewTimeLimit) {
        clearInterval(this.timerId);
        onExpire();
      }
    }, 200);
  }

  stopTimer() {
    if (this.timerId) clearInterval(this.timerId);
  }
}