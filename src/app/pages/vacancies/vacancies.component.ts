import { Component, OnInit } from '@angular/core';
import { IVacanciesResponse } from 'src/shared/interfaces/vacancies/vacancies.interface';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {


  public userVacancies: Array <IVacanciesResponse> = [];


  constructor(
    private vacanciesService: VacanciesService

    ) {}

  ngOnInit(): void {
    this.getVacancie();
  }

  getVacancie():void{
    this.vacanciesService.getAllFirebaseVacancies().subscribe(data => {
      this.userVacancies = data as IVacanciesResponse[];
    });
  }

}
