import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctavkaRoutingModule } from './doctavka-routing.module';
import { DoctavkaComponent } from './doctavka.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    DoctavkaComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    DoctavkaRoutingModule,
    SharedModule
  ]
})
export class DoctavkaModule { }