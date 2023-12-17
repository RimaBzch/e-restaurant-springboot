import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class WebsocketshareService implements OnDestroy {

  private blogDataSubject = new BehaviorSubject<string>('test');

  constructor() { }
  ngOnDestroy(): void {
      this.blogDataSubject.unsubscribe();
  }
  
  onNewValueReceive(msg: string) {        
      this.blogDataSubject.next(msg);
  }

  getNewValue(): Observable<string> {
      return this.blogDataSubject.asObservable();
  }
}
