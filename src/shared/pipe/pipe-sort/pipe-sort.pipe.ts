import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';

@Pipe({
  name: 'pipeSort'
})
export class PipeSortPipe implements PipeTransform {

  transform(products: IProductResponse[], field: string, ascending: boolean): IProductResponse[] {
    if (!products || products.length <= 1) {
      return products;
    }
  
    const sortedProducts = [...products].sort((a, b) => {
      if (field === 'weight') {
        if (ascending) {
          return +a.weight - +b.weight;
        } else {
          return +b.weight - +a.weight;
        }
      }
      if (field === 'price') {
        if (ascending) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      }
      return 0; // Додано для випадку, коли field не дорівнює 'weight' або 'price'
    });
  
    return sortedProducts;
  }
}
