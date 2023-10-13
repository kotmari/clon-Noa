import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';

import { VacanciesInfoComponent } from './vacancies-info.component';

describe('VacanciesInfoComponent', () => {
  let component: VacanciesInfoComponent;
  let fixture: ComponentFixture<VacanciesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacanciesInfoComponent],
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        { provide: Firestore, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(VacanciesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
