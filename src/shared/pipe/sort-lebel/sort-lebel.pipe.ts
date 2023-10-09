import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';

@Pipe({
  name: 'sortLebel'
})
export class SortLebelPipe implements PipeTransform {

  transform(products: IProductResponse[], label: string): IProductResponse[] {
    if (!products || !label) {
      return products;
    }

    return products.filter((product) => product.lebel === label);
  }

}
