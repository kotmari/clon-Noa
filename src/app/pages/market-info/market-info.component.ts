import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/shared/services/category/category.service';
import { OrderService } from 'src/shared/services/orders/order.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'app-market-info',
  templateUrl: './market-info.component.html',
  styleUrls: ['./market-info.component.scss']
})
export class MarketInfoComponent {
  public userProductDetalis!: IProductResponse;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    // private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.getOneProduct()
   }
 
   getOneProduct(): void{
     const PRODUCT_ID = this.activatedRoute.snapshot.paramMap.get('id');
     this.productService.getOneFirebaseProduct(PRODUCT_ID as string).subscribe(data=>{
       this.userProductDetalis = data as IProductResponse;
       console.log(this.userProductDetalis)
     });
   }
 
 
   productCount(product: IProductResponse, value: boolean): void{
     if(value){
       ++product.count;
     } else if (!value && product.count > 1){
       --product.count;
     }
   }
 
   addToBasket(product: IProductResponse): void{
     let basket: Array<IProductResponse> = [];
     if (localStorage.length >0 && localStorage.getItem('basket')){
       basket=JSON.parse(localStorage.getItem('basket') as string);
       if (basket.some(prod => prod.id === product.id)){
         const index = basket.findIndex(prod => prod.id === product.id);
         basket[index].count += product.count;
       }else{
         basket.push(product);
       }
     }else{
       basket.push(product);
     }
     localStorage.setItem('basket', JSON.stringify(basket));
     product.count = 1;
    //  this.orderService.changeBasket.next(true);
   }



}
