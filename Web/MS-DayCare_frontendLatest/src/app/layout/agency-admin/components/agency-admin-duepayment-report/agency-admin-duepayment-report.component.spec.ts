import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminDuepaymentReportComponent } from './agency-admin-duepayment-report.component';

describe('AgencyAdminDuepaymentReportComponent', () => {
  let component: AgencyAdminDuepaymentReportComponent;
  let fixture: ComponentFixture<AgencyAdminDuepaymentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminDuepaymentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminDuepaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
