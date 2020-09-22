import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsRegistrationComponent } from './parents-registration.component';

describe('ParentsRegistrationComponent', () => {
  let component: ParentsRegistrationComponent;
  let fixture: ComponentFixture<ParentsRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
