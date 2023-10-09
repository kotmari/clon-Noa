import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThaiMarketComponent } from './thai-market.component';



const routes: Routes = [
  { path: '', component: ThaiMarketComponent },
  { path: ':id', loadChildren: () => import('../../market-info/market-info.module').then(m => m.MarketInfoModule) },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThaiMarketRoutingModule { }