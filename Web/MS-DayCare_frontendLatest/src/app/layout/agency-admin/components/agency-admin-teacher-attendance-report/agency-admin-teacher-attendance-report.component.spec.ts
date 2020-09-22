import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminTeacherAttendanceReportComponent } from './agency-admin-teacher-attendance-report.component';

describe('AgencyAdminTeacherAttendanceReportComponent', () => {
  let component: AgencyAdminTeacherAttendanceReportComponent;
  let fixture: ComponentFixture<AgencyAdminTeacherAttendanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminTeacherAttendanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminTeacherAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
