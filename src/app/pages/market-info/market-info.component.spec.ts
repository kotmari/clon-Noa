import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from 'src/shared/services/product/product.service';

import { MarketInfoComponent } from './market-info.component';

describe('MarketInfoComponent', () => {
  let component: MarketInfoComponent;
  let fixture: ComponentFixture<MarketInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketInfoComponent ],
      imports:[ HttpClientTestingModule],
      providers:[
        ProductService,
          { provide: Firestore, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
