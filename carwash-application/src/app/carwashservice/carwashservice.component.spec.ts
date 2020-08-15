import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarwashserviceComponent } from './carwashservice.component';

describe('CarwashserviceComponent', () => {
  let component: CarwashserviceComponent;
  let fixture: ComponentFixture<CarwashserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarwashserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarwashserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
