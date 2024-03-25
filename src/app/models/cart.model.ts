import { Product } from './product.model';

export interface CartItem<T> {
  item: Product;
  quantity: number;
}
