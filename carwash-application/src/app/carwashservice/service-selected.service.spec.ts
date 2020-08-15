import { TestBed } from '@angular/core/testing';

import { ServiceSelectedService } from './service-selected.service';

describe('ServiceSelectedService', () => {
  let service: ServiceSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
