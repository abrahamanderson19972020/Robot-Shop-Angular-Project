import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterText: string = '';
  cart: Product[] = [];
  cartSubscription: Subscription | undefined;
  totalCart: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductsOfCart();
    //this.calculateTotalPrice();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  filterProducts() {
    return this.filterText === ''
      ? this.products
      : this.products.filter((p) => p.category === this.filterText);
  }

  addToCart(product: Product) {
    // this.productService.addProductToCart(product);
    this.cartService.addToCart(product);
  }

  // getProductsFromCart() {
  //   this.productService.getProductListFromCart().subscribe((items) => {
  //     this.cart = items;
  //   });
  //}
  getProductsOfCart() {
    this.cartService.getCartItems().subscribe((res) => {
      this.cart = res;
    });
  }
  // calculateTotalPrice() {
  //   this.productService.getCalculatedTotalCartPrice().subscribe((val) => {
  //     this.totalCart = val;
  //   });
  // }
}
