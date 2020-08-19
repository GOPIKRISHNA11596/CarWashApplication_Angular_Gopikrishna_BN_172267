import { TestBed } from '@angular/core/testing';

import { ServiceRequestAcceptedService } from './service-request-accepted.service';

describe('ServiceRequestAcceptedService', () => {
  let service: ServiceRequestAcceptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRequestAcceptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
