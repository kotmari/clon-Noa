import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/shared/services/category/category.service';
import { DialogDeliveryService } from 'src/shared/services/dialog-delivery/dialog-delivery.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  message = new FormControl('Info about the action');

  public userHomeProducts:Array<IProductResponse>=[];
  public userCategories:Array<ICategoryResponse> =[];
  public accordionClick = false;


  public categoryName!: string;
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ){
  }

  ngOnInit(): void {
    this.loadCategoryName();
    
  }

  loadCategoryName(){
    this.categoryService.getAllFirebaseCategories().subscribe(data => {
      this.userCategories = data as ICategoryResponse [];
    })
  }

  toggleAccordion() {
    this.accordionClick = !this.accordionClick;
  }
}
