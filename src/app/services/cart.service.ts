import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //private productsToCart: CartItem<Product>[] = [];
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private cartSubject: Subject<CartItem<Product>[]> = new Subject<
    CartItem<Product>[]
  >();
  private totalCartPrice: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  urlCart: string = 'http://localhost:8081/api/cart';
  constructor(private httpClient: HttpClient) {}

  getCartItems() {
    this.httpClient.get<Product[]>(this.urlCart).subscribe((res) => {
      this.totalCartPrice.next(this.calculateTotalPrice());
      this.cart.next(res);
    });
  }

  getCart(): Observable<Product[]> {
    return this.cart.asObservable();
  }

  addToCart(product: Product) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.httpClient.post<Product[]>(this.urlCart, newCart).subscribe((res) => {
      console.log(res);
      console.log(product.name + ' id added to Cart');
      this.totalCartPrice.next(this.calculateTotalPrice());
    });
  }

  removeProductFromCart(product: Product) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.httpClient.post(this.urlCart, newCart).subscribe((res) => {
      console.log(product.name + '  is removed from cart');
      this.totalCartPrice.next(this.calculateTotalPrice());
    });
  }

  getProductListFromCart() {
    return this.cartSubject.asObservable();
  }

  private calculateTotalPrice(): number {
    let totalPrice = 0;
    this.cart.getValue().forEach((it) => {
      totalPrice += it.price - it.price * it.discount;
      //     (it.price - it.price * it.discount) * it.quantity;
    });
    return totalPrice;
  }

  public getCalculatedTotalCartPrice() {
    return this.totalCartPrice.asObservable();
  }
}
