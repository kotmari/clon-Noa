import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketInfoComponent } from './market-info.component';


const routes: Routes = [
  { path: '', component: MarketInfoComponent },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketInfoRoutingModule { }