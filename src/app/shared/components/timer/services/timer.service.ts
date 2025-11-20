import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface RemainingTime {
  minutes: string;
  seconds: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  getRemainingTime(targetDate: Date): RemainingTime {
    const currentTimeMs  = new Date().getTime();
    const endTimeMs  = targetDate.getTime();
    const timeLeftMs = endTimeMs  - currentTimeMs ;

    if (timeLeftMs <= 0) return { minutes: '00', seconds: '00'};

    const formatted = moment.utc(timeLeftMs).format('mm:ss');
    const [minutes, seconds] = formatted.split(':');

  return { minutes, seconds };
  }
}