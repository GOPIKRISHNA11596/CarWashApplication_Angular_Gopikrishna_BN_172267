import { TestBed } from '@angular/core/testing';

import { OrderAcceptedService } from './order-accepted.service';

describe('OrderAcceptedService', () => {
  let service: OrderAcceptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAcceptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
