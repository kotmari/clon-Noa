import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { OrderUsersComponent } from './order-users.component';

describe('OrderUsersComponent', () => {
  let component: OrderUsersComponent;
  let fixture: ComponentFixture<OrderUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUsersComponent ],
      imports:[ HttpClientTestingModule ],
      providers: [ { provide: Firestore, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
