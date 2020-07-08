import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentPaymentHistoryComponent } from './parent-payment-history.component';

describe('ParentPaymentHistoryComponent', () => {
  let component: ParentPaymentHistoryComponent;
  let fixture: ComponentFixture<ParentPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
