import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MarketInfoComponent } from './market-info.component';
import { MarketInfoRoutingModule } from './market-info-routing.module';




@NgModule({
  declarations: [
    MarketInfoComponent,
  ],
   imports: [
    CommonModule,
    MarketInfoRoutingModule,
    SharedModule
  ]
})
export class MarketInfoModule { }