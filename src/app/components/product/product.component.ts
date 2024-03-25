import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() chosenProduct: EventEmitter<Product> = new EventEmitter<Product>();

  ngOnInit(): void {}

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

  buyProduct(product: Product) {
    this.chosenProduct.emit(product);
    console.log(product.name + ' is chosen!');
  }
}
