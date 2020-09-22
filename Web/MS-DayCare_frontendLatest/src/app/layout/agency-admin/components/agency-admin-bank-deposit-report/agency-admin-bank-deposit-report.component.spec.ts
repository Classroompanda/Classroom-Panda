import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminBankDepositReportComponent } from './agency-admin-bank-deposit-report.component';

describe('AgencyAdminBankDepositReportComponent', () => {
  let component: AgencyAdminBankDepositReportComponent;
  let fixture: ComponentFixture<AgencyAdminBankDepositReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminBankDepositReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminBankDepositReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
