import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminStaffBirthReportComponent } from './agency-admin-staff-birth-report.component';

describe('AgencyAdminStaffBirthReportComponent', () => {
  let component: AgencyAdminStaffBirthReportComponent;
  let fixture: ComponentFixture<AgencyAdminStaffBirthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminStaffBirthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminStaffBirthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
