import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { map, Observable, of } from 'rxjs';
import { IVacanciesResponse } from 'src/shared/interfaces/vacancies/vacancies.interface';
import { VacanciesService } from './vacancies.service';

@Injectable({
  providedIn: 'root'
})
export class VacancieResolver implements Resolve<IVacanciesResponse> {

  constructor(
    private vacanciesService: VacanciesService
  ){}



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVacanciesResponse> {
    const id = route.paramMap.get('id');
    return this.vacanciesService.getOneFirebaseVacancies(id as string).pipe(
      map((data: DocumentData)=> {
        const vacancieResponse: IVacanciesResponse = {
          id: data.toString(),
          name: data.toString(),
          title: data.toString(),
          description: data.toString(),
          imagePath: data.toString(),
        }; 
        return vacancieResponse
      })
    )
  }




}
