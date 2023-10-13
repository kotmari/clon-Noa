import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DoctavkaComponent } from './doctavka.component';

describe('DoctavkaComponent', () => {
  let component: DoctavkaComponent;
  let fixture: ComponentFixture<DoctavkaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctavkaComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(DoctavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
