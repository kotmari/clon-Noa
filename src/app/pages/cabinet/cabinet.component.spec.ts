import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetComponent } from './cabinet.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Firestore } from '@angular/fire/firestore';

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        { provide: Firestore, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
