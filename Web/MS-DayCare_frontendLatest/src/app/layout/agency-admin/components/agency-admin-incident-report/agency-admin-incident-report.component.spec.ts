import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminIncidentReportComponent } from './agency-admin-incident-report.component';

describe('AgencyAdminIncidentReportComponent', () => {
  let component: AgencyAdminIncidentReportComponent;
  let fixture: ComponentFixture<AgencyAdminIncidentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminIncidentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminIncidentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
