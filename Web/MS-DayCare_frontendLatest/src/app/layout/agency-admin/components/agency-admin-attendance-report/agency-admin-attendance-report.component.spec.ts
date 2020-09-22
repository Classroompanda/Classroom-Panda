import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAttendanceReportComponent } from './agency-admin-attendance-report.component';

describe('AgencyAdminAttendanceReportComponent', () => {
  let component: AgencyAdminAttendanceReportComponent;
  let fixture: ComponentFixture<AgencyAdminAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
