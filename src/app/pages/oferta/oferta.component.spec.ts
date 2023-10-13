import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OfertaComponent } from './oferta.component';

describe('OfertaComponent', () => {
  let component: OfertaComponent;
  let fixture: ComponentFixture<OfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertaComponent],
      imports:[
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(OfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
