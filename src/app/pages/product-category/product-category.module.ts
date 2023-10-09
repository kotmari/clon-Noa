import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { ProductCategoryComponent } from './product-category.component';
import { SharedModule } from '../../../shared/shared.module';
import { PipeSortPipe } from 'src/shared/pipe/pipe-sort/pipe-sort.pipe';
import { SortLebelPipe } from 'src/shared/pipe/sort-lebel/sort-lebel.pipe';






@NgModule({
  declarations: [
    ProductCategoryComponent,
    PipeSortPipe,
    SortLebelPipe
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { 


}
