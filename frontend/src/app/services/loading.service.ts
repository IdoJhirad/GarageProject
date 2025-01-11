import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Observable to expose the loading state

  show(): void {
    this.loadingSubject.next(true); // Show spinner
  }

  hide(): void {
    this.loadingSubject.next(false); // Hide spinner
  }
}
