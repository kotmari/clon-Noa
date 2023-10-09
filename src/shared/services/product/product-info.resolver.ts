import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { map, Observable, of } from 'rxjs';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {

  constructor(private productService: ProductService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productService.getOneFirebaseProduct(route.paramMap.get('id')).pipe(
    map((data: DocumentData)=> {
      const productResponse: IProductResponse = {
        id: data.toString(),
        category: {} as ICategoryResponse,
        name: data.toString(),
          path: data.toString(),
          description: data.toString(),
          weight: data.toString(),
          price: 0,
          imagePath: data.toString(),
          count: 0,
          isFavorite: data['isFavorite'] || false,
          lebel: data.toString()
        };
        return productResponse;
      })
    );
  }
}
