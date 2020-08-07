import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasherloginComponent } from './washerlogin.component';

describe('WasherloginComponent', () => {
  let component: WasherloginComponent;
  let fixture: ComponentFixture<WasherloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasherloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasherloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
