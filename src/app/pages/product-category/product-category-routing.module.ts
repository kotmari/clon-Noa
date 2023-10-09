import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';




const routes: Routes = [
  { path: '', component: ProductCategoryComponent},
  { path: ':id', loadChildren: () => import('../product-info/product-info.module').then(m => m.ProductInfoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }