import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { name: string; description: string; price: number; imageUrl: string }[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartService.cartCount$.subscribe(() => {
      this.cartItems = this.cartService.getCartItems();
    });
  }

  removeFromCart(product: { name: string; description: string; price: number; imageUrl: string }): void {
    this.cartService.removeFromCart(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
