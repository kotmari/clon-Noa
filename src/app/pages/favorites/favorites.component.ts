import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { OrderService } from 'src/shared/services/orders/order.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public userFavoritProducts: Array<IProductResponse> = [];
  public categoryName!: string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadFavorit();
  }

  loadFavorit() {
    if (localStorage.length > 0 && localStorage.getItem('favorite')) {
      this.userFavoritProducts = JSON.parse(
        localStorage.getItem('favorite') as string
      );
    }
  }

  deleteleToFavorites(product: IProductResponse): void {
    if (this.userFavoritProducts.some((prod) => prod.id === product.id)) {
      const index = this.userFavoritProducts.findIndex(
        (prod) => prod.id === product.id
      );
      this.userFavoritProducts.splice(index, 1);
      localStorage.setItem(
        'favorite',
        JSON.stringify(this.userFavoritProducts)
      );
      this.updateFavorite();
      this.orderService.changeBasket.next(false);
    }
  }

  updateFavorite() {
    this.orderService.changeFavorit.subscribe(() => {
      this.loadFavorit();
    });
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
}
