import { TestBed } from '@angular/core/testing';

import { VacancieResolver } from '../vacancies/vacancie.resolver';

describe('VacancieResolver', () => {
  let resolver: VacancieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VacancieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
