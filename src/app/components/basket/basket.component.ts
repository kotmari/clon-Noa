import { Component } from '@angular/core';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { OrderService } from 'src/shared/services/orders/order.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  public userBaskets:Array<IProductResponse>=[];

  public total = 0;
  public count = 0;

  public userBasket!:boolean;

  constructor(
    private productService: ProductService,
    private orderService: OrderService

  ){}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    
  }

  loadBasket(){
    if(localStorage.length>0 && localStorage.getItem('basket')){
      this.userBaskets= JSON.parse(localStorage.getItem('basket')as string)
    }
    this.getTotalPrace();
    this.getCountTotal();
  }

  getTotalPrace(){
    this.total = this.userBaskets.reduce(
      (total: number, prod: IProductResponse) =>
      total + prod.count * prod.price,
      0
    );
    console.log(this.total)
  }

  getCountTotal(){
    this.count = this.userBaskets.reduce(
      (count: number, prod: IProductResponse) =>
      count + prod.count,
      0
    );
  }

  productCount(product: IProductResponse, value: boolean){
    if(value){
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.userBaskets));
    }else if (!value && product.count > 1){
      --product.count;
      localStorage.setItem('basket', JSON.stringify(this.userBaskets));
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);

  }

  updateBasket(){
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket();
    })
  }

  deleteBasketProduct(product: IProductResponse): void {
    if (this.userBaskets.some((prod) => prod.id === product.id)) {
      const index = this.userBaskets.findIndex(
        (prod) => prod.id === product.id
      );
      this.userBaskets.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.userBaskets));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }


  // closeModal() {
  //   this.activeModal.dismiss();
  // }






}
