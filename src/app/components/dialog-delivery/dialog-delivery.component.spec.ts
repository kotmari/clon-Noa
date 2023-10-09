import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeliveryComponent } from './dialog-delivery.component';

describe('DialogDeliveryComponent', () => {
  let component: DialogDeliveryComponent;
  let fixture: ComponentFixture<DialogDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
