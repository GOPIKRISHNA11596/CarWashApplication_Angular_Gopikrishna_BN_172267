import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasherDetailsComponent } from './washer-details.component';

describe('WasherDetailsComponent', () => {
  let component: WasherDetailsComponent;
  let fixture: ComponentFixture<WasherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
