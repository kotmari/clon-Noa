import { TestBed } from '@angular/core/testing';

import { DialogDeliveryService } from './dialog-delivery.service';

describe('DialogDeliveryService', () => {
  let service: DialogDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
