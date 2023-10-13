import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { VacanciesService } from './vacancies.service';

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Firestore, useValue: {}}
      ]
    });
    service = TestBed.inject(VacanciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
