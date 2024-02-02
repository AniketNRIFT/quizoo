import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  currentTime:number = 0;
  timer:any | null;
  constructor(private storage : LocalService) { }
  startTimer(duration:number, tick:Function,  onComplete:Function) {
    const start = this.storage.getData<number>("currentTime");
    this.currentTime = start && start < duration ? start : 0;
    if (!start) {
      this.storage.setData<number>("currentTime", 0);
    }
    this.timer = setInterval(()=>{
      this.currentTime = this.currentTime + 1;
      tick();
      this.storage.setData<number>("currentTime", this.currentTime);
      if (this.currentTime > duration) {
        onComplete();
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    }, 1000);
  }
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
