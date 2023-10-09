import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctavkaComponent } from './doctavka.component';

describe('DoctavkaComponent', () => {
  let component: DoctavkaComponent;
  let fixture: ComponentFixture<DoctavkaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctavkaComponent]
    });
    fixture = TestBed.createComponent(DoctavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
