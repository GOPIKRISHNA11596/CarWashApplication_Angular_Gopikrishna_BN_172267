import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestDescriptionComponent } from './service-request-description.component';

describe('ServiceRequestDescriptionComponent', () => {
  let component: ServiceRequestDescriptionComponent;
  let fixture: ComponentFixture<ServiceRequestDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
