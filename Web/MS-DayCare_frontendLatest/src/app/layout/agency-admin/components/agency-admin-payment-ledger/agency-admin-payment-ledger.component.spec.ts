import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminPaymentLedgerComponent } from './agency-admin-payment-ledger.component';

describe('AgencyAdminPaymentLedgerComponent', () => {
  let component: AgencyAdminPaymentLedgerComponent;
  let fixture: ComponentFixture<AgencyAdminPaymentLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminPaymentLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminPaymentLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
