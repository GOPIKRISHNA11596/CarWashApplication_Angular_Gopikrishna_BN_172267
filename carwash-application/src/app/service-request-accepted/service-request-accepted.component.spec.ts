import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestAcceptedComponent } from './service-request-accepted.component';

describe('ServiceRequestAcceptedComponent', () => {
  let component: ServiceRequestAcceptedComponent;
  let fixture: ComponentFixture<ServiceRequestAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
