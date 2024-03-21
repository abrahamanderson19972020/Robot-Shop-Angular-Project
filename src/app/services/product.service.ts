import { Injectable } from '@angular/core';
import { Products } from '../data/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts() {
    return Products;
  }
}
