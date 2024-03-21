import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filterText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const result = this.productService.getProducts();
    result.forEach((p) => {
      if (p) {
        this.products.push(p);
      }
    });
  }

  getFullImagePath(imageName: string) {
    return '/assets/images/robot-parts/' + imageName;
  }

  getProductPrice(product: Product) {
    return product.discount
      ? product.price - product.price * product.discount
      : product.price;
  }

  getClass(product: Product) {
    return product.discount ? 'discount' : '';
  }

  filterProducts() {
    return this.filterText === ''
      ? this.products
      : this.products.filter((p) => p.category === this.filterText);
  }
}
