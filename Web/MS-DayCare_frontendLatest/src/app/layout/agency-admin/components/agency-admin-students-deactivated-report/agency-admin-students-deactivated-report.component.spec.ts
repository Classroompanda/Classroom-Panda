import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminStudentsDeactivatedReportComponent } from './agency-admin-students-deactivated-report.component';

describe('AgencyAdminStudentsDeactivatedReportComponent', () => {
  let component: AgencyAdminStudentsDeactivatedReportComponent;
  let fixture: ComponentFixture<AgencyAdminStudentsDeactivatedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminStudentsDeactivatedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminStudentsDeactivatedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
