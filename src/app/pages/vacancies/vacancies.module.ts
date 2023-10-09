import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacanciesRoutingModule } from './vacancies-routing.module';
import { VacanciesComponent } from './vacancies.component';
import { SharedModule } from '../../../shared/shared.module';
import { VacanciesInfoComponent } from "../vacancies-info/vacancies-info.component";
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    VacanciesComponent,
    VacanciesInfoComponent
  ],
  imports: [
    CommonModule,
    VacanciesRoutingModule,
    SharedModule,
    SwiperModule

  ]
})
export class VacanciesModule { }