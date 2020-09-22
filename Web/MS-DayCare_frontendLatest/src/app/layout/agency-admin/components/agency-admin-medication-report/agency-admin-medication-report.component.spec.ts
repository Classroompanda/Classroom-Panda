import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminMedicationReportComponent } from './agency-admin-medication-report.component';

describe('AgencyAdminMedicationReportComponent', () => {
  let component: AgencyAdminMedicationReportComponent;
  let fixture: ComponentFixture<AgencyAdminMedicationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminMedicationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminMedicationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
