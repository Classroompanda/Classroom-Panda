import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminKioskidReportComponent } from './agency-admin-kioskid-report.component';

describe('AgencyAdminKioskidReportComponent', () => {
  let component: AgencyAdminKioskidReportComponent;
  let fixture: ComponentFixture<AgencyAdminKioskidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminKioskidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminKioskidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
