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
  private productsToCart: Product[] = [];
  private cartSubject: Subject<CartItem<Product>[]> = new Subject<
    CartItem<Product>[]
  >();
  private totalCartPrice: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  urlCart: string = 'http://localhost:8081/api/cart';
  constructor(private httpClient: HttpClient) {}

  getCartItems(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.urlCart);
  }

  addToCart(product: Product) {
    // const isFound = this.checkIsItemInCart(product.name);
    // if (isFound !== undefined) {
    // }
    this.productsToCart.push(product);
    this.httpClient
      .post<Product[]>(this.urlCart, this.productsToCart)
      .subscribe((res) => {
        console.log(res);
        console.log(product.name + ' id added to Cart');
      });
  }
  // addProductToCart(product: Product) {
  //   let isFound = this.productsToCart.find((p) => p.item.name === product.name);
  //   if (isFound !== undefined) {
  //     isFound.quantity++;
  //   } else {
  //     let newItem: CartItem<Product> = {
  //       item: product,
  //       quantity: 1,
  //     };
  //     this.productsToCart.push(newItem);
  //     this.cartSubject.next([...this.productsToCart]);
  //   }
  //   let totalPrice = this.calculateTotalPrice();
  //   this.totalCartPrice.next(totalPrice);
  // }

  getProductListFromCart() {
    return this.cartSubject.asObservable();
  }

  // private calculateTotalPrice(): number {
  //   let totalPrice = 0;
  //   this.productsToCart.forEach((it) => {
  //     totalPrice +=
  //       (it.item.price - it.item.price * it.item.discount) * it.quantity;
  //   });
  //   return totalPrice;
  // }

  getCalculatedTotalCartPrice() {
    return this.totalCartPrice.asObservable();
  }
}
