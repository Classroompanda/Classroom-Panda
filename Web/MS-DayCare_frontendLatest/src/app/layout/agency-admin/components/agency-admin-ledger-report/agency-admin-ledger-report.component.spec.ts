import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminLedgerReportComponent } from './agency-admin-ledger-report.component';

describe('AgencyAdminLedgerReportComponent', () => {
  let component: AgencyAdminLedgerReportComponent;
  let fixture: ComponentFixture<AgencyAdminLedgerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminLedgerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminLedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
