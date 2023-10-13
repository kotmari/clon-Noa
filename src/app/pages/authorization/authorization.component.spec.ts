import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { AuthorizationComponent } from './authorization.component';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
      imports: [ HttpClientTestingModule],
      providers:[
        { provide: Auth, useValue: {}},
        { provide: Firestore, useValue: {}},
        { provide: ToastrService, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
