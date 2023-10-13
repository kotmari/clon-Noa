import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { DialogDeliveryService } from './dialog-delivery.service';

describe('DialogDeliveryService', () => {
  let service: DialogDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        { provide: MatDialog, useValue: {} }
      ]
    });
    service = TestBed.inject(DialogDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
