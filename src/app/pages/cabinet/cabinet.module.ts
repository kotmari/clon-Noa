import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { AboutUserComponent } from './aboutUser/about-user/about-user.component';
import { OrderUsersComponent } from './orderUsers/order-users/order-users.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';



@NgModule({
  declarations: [
    CabinetComponent,
    AboutUserComponent,
    OrderUsersComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }