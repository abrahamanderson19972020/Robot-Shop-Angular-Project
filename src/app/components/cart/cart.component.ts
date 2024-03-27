import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartTotal: number | undefined;
  cartItems: Product[] | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartTotal();
    this.getCartItems();
  }

  getFullImagePath(imageName: string) {
    return ' /assets/images/robot-parts/' + imageName;
  }

  removeFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }

  getCartTotal() {
    this.cartService.getCalculatedTotalCartPrice().subscribe((res) => {
      this.cartTotal = res;
    });
  }

  getCartItems() {
    this.cartService.getCart().subscribe((res) => {
      this.cartItems = res;
    });
  }
}
