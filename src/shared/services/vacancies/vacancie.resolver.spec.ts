import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { VacancieResolver } from '../vacancies/vacancie.resolver';

describe('VacancieResolver', () => {
  let resolver: VacancieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Firestore, useValue: {}},
      ]
    });
    resolver = TestBed.inject(VacancieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
