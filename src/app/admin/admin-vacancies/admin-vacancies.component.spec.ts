import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVacanciesComponent } from './admin-vacancies.component';

describe('AdminVacanciesComponent', () => {
  let component: AdminVacanciesComponent;
  let fixture: ComponentFixture<AdminVacanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVacanciesComponent]
    });
    fixture = TestBed.createComponent(AdminVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
