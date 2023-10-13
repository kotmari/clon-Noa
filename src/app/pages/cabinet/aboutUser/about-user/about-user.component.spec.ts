import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { AboutUserComponent } from './about-user.component';

describe('AboutUserComponent', () => {
  let component: AboutUserComponent;
  let fixture: ComponentFixture<AboutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUserComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers:[
        { provide: Firestore, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
