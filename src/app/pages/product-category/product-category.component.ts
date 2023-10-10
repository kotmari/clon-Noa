import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { OrderService } from 'src/shared/services/orders/order.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  public userProducts: Array<IProductResponse>=[];
  public userFavoritProducts: Array<IProductResponse>=[];
  public categoryName!: string;
  private eventSubscription!: Subscription;
  public accordionClick = false;
  public isFavorite = false;
  public isCategoryActive = false;
  public ascending: boolean = true;
  public price = 'price';
  public weight = 'weight';
  public filed!: string;
  public selectedLabel: string = '';
  pselectedLabelVeggie: string = '';



  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ){
    this.eventSubscription = this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.loadProduct();
      }
    });
    }

  ngOnInit(): void {
    this.loadFavorit()
  }

    loadProduct(): void{
      this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
      this.productService.getAllByCategoryFirebase(this.categoryName).then((data)=>{
        console.log(data)
        this.userProducts = data as IProductResponse[];
      })
    }

    loadFavorit(){
      if (localStorage.length > 0 && localStorage.getItem('favorite')) {
        const favoriteIds = JSON.parse(localStorage.getItem('favorite') as string).map((product: IProductResponse) => product.id);
        this.userProducts.forEach((product: IProductResponse) => {
          product.isFavorite = favoriteIds.includes(product.id);
        });
      }
    }

    productCount(product: IProductResponse, value: boolean): void{
      if(value){
        ++product.count;
      } else if (!value && product.count > 1){
        --product.count;
      }
    }


    toggleToFavorites(product: IProductResponse): void {
      let favorite: Array<IProductResponse> = JSON.parse(localStorage.getItem('favorite') || '[]');
      const index = favorite.findIndex((prod) => prod.id === product.id);
    
      if (index !== -1) {
        favorite.splice(index, 1);
      } else {
        favorite.push(product);
      }
      localStorage.setItem('favorite', JSON.stringify(favorite));
      product.isFavorite = !product.isFavorite;
    }
    
  
    addToBasket(product: IProductResponse): void{
      let basket: Array<IProductResponse> = [];
      if (localStorage.length > 0 && localStorage.getItem('basket')){
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
        this.orderService.changeBasket.next(true);
    }
  
    ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
    }

    sortSubr(field: string){
      this.filed = field;
      this.ascending = !this.ascending;
    }

    setSelectedLabel(label: string) {
      this.selectedLabel = label;
    }

    toggleList(){
      const categoryTitle = document.querySelector('.category-title');
      const categoriesMenu = document.querySelector('.categories-menu');
    
      if (categoryTitle && categoriesMenu) {
        if (this.isCategoryActive) {
          categoryTitle.classList.remove('active');
          categoriesMenu.classList.remove('active');
          this.isCategoryActive = !this.isCategoryActive;
        }
        else {
          categoryTitle.classList.add('active');
          categoriesMenu.classList.add('active');
          this.isCategoryActive = !this.isCategoryActive;
        }
      }
       }
    
  toggleAccordion() {
    this.accordionClick = !this.accordionClick;
  }
}
