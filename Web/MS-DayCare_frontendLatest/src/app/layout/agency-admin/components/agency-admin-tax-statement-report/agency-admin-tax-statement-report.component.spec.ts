import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminTaxStatementReportComponent } from './agency-admin-tax-statement-report.component';

describe('AgencyAdminTaxStatementReportComponent', () => {
  let component: AgencyAdminTaxStatementReportComponent;
  let fixture: ComponentFixture<AgencyAdminTaxStatementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminTaxStatementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminTaxStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
