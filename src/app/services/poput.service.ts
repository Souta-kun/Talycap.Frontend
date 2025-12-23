import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PoputService {
  _isOpen = signal(false);

  open() {
    this._isOpen.set(true);
    
    setTimeout(() => {
      this._isOpen.set(false);
    }, 2500);
  }
}
