import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentPaymentAchComponent } from './parent-payment-ach.component';

describe('ParentPaymentAchComponent', () => {
  let component: ParentPaymentAchComponent;
  let fixture: ComponentFixture<ParentPaymentAchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentPaymentAchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentPaymentAchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
