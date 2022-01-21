import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  public readonly value$: Observable<number>;
  public readonly subscribers$ = new BehaviorSubject(0);

  constructor() {
    this.value$ = new Observable(subscriber => {

      console.log('subscriber added');
      this.subscribers$.next(this.subscribers$.value + 1);

      let value = 0;
      setInterval(() => {
        subscriber.next(value);
        value++;
      }, 1000);

      return () => {
        console.log('subscriber removed');
        this.subscribers$.next(this.subscribers$.value - 1);
      };
    });
  }
}
