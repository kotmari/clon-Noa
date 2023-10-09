import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUserComponent } from './aboutUser/about-user/about-user.component';
import { CabinetComponent } from './cabinet.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';
import { OrderUsersComponent } from './orderUsers/order-users/order-users.component';


const routes: Routes = [
  { path: '', component: CabinetComponent, children: [
    { path: 'aboutUser', component: AboutUserComponent},
    { path: 'orderUser', component: OrderUsersComponent},
    { path: 'change-password', component: ChangePasswordComponent},
    { path: '', pathMatch: 'full', redirectTo: 'aboutUser'}
  ]}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }