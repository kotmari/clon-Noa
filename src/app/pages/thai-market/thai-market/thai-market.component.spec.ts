import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from 'src/shared/services/product/product.service';

import { ThaiMarketComponent } from './thai-market.component';

describe('ThaiMarketComponent', () => {
  let component: ThaiMarketComponent;
  let fixture: ComponentFixture<ThaiMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThaiMarketComponent ],
      imports:[ HttpClientTestingModule],
      providers:[
        { provide: Firestore, useValue: {}}
     ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
