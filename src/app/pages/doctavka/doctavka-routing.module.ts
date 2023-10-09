import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctavkaComponent } from './doctavka.component'

const routes: Routes = [
  { path: '', component: DoctavkaComponent }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctavkaRoutingModule { }