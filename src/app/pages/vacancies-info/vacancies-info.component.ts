import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IVacanciesResponse } from 'src/shared/interfaces/vacancies/vacancies.interface';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';
import SwiperCore, { Navigation, Pagination} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesInfoComponent implements OnInit {

  public vacancie!: IVacanciesResponse;
  public userVacancies: Array <IVacanciesResponse> = [];

  public vacancieId: string | null = null;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    private vacanciesService: VacanciesService,
    private renderer: Renderer2,
    private activatedRouter: ActivatedRoute,
  ){}


  ngOnInit(): void {
   this.activatedRouter.paramMap.subscribe((params: ParamMap) => {
      this.vacancieId = params.get('id');
      this.getOneVacancie();
    });
    this.getVacancie();

  }


  getOneVacancie(): void{
    if (this.vacancieId) {
      this.vacanciesService.getOneFirebaseVacancies(this.vacancieId).subscribe(data => {
        this.vacancie = data as IVacanciesResponse;
      });
    }
  }

  getVacancie():void{
    this.vacanciesService.getAllFirebaseVacancies().subscribe(data => {
      this.userVacancies = data as IVacanciesResponse[];
   });
    
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }


  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }




}
