import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';

import { VacanciesComponent } from './vacancies.component';

describe('VacanciesComponent', () => {
  let component: VacanciesComponent;
  let fixture: ComponentFixture<VacanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacanciesComponent],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Firestore, useValue: {}}
     ]
    });
    fixture = TestBed.createComponent(VacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
