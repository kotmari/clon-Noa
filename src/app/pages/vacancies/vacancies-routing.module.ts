import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesInfoComponent } from '../vacancies-info/vacancies-info.component';
import { VacancieResolver } from 'src/shared/services/vacancies/vacancie.resolver';



const routes: Routes = [
  { path: '', component: VacanciesComponent },
  { path: ':id', component: VacanciesInfoComponent,
     resolve:{ vacancieInfo: VacancieResolver }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesRoutingModule { }