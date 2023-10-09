import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoResolver } from 'src/shared/services/product/product-info.resolver';
import { ProductInfoComponent } from './product-info.component';



const routes: Routes = [
    { path: '', component: ProductInfoComponent, resolve: { productInfo: ProductInfoResolver } },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductInfoRoutingModule { }