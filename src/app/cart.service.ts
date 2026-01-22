import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private showCartSubject = new BehaviorSubject<boolean>(false);
  showCart$ = this.showCartSubject.asObservable();

  constructor() { }

  openCart() {
    this.showCartSubject.next(true);
  }

  closeCart() {
    this.showCartSubject.next(false);
  }

  get showCart() {
    return this.showCartSubject.value;
  }
}