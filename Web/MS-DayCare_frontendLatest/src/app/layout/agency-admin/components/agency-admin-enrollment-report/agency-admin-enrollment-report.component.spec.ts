import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminEnrollmentReportComponent } from './agency-admin-enrollment-report.component';

describe('AgencyAdminEnrollmentReportComponent', () => {
  let component: AgencyAdminEnrollmentReportComponent;
  let fixture: ComponentFixture<AgencyAdminEnrollmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminEnrollmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminEnrollmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
