import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDialogComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {}},
        { provide: Firestore, useValue: {}},
        { provide: ToastrService, useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
