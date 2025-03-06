import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { name: string; description: string; price: number; imageUrl: string }[] = [];
  private cartCount = new BehaviorSubject<number>(0); // Reactive cart count

  cartCount$ = this.cartCount.asObservable(); // Expose as Observable

  constructor() {}

  addToCart(product: { name: string; description: string; price: number; imageUrl: string }): void {
    this.cart.push(product);
    this.cartCount.next(this.cart.length); // Update count reactively
  }

  getCartItems(): { name: string; description: string; price: number; imageUrl: string }[] {
    return [...this.cart]; // Return a copy to prevent direct mutation
  }

  removeFromCart(product: { name: string; description: string; price: number; imageUrl: string }): void {
    const index = this.cart.findIndex(item => item.name === product.name);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.cartCount.next(this.cart.length); // Update count reactively
    }
  }

  clearCart(): void {
    this.cart = [];
    this.cartCount.next(0);
  }

  getCartCount(): number {
    return this.cart.length;
  }
}
