import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ThaiMarketComponent } from './thai-market.component';
import { ThaiMarketRoutingModule } from './thai-market-routing.module';


@NgModule({
  declarations: [
    ThaiMarketComponent,
   ],
  imports: [
    CommonModule,
    ThaiMarketRoutingModule,
    SharedModule
  ]
})
export class ThaiMarketModule { }
