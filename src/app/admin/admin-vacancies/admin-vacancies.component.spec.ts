import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';

import { AdminVacanciesComponent } from './admin-vacancies.component';

describe('AdminVacanciesComponent', () => {
  let component: AdminVacanciesComponent;
  let fixture: ComponentFixture<AdminVacanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVacanciesComponent],
      imports: [ HttpClientTestingModule],
      providers:[
        { provide: Firestore, useValue: {}}
     ]
    });
    fixture = TestBed.createComponent(AdminVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
