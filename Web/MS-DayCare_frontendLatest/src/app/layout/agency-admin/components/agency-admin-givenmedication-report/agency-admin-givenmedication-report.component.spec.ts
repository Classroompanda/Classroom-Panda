import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminGivenmedicationReportComponent } from './agency-admin-givenmedication-report.component';

describe('AgencyAdminGivenmedicationReportComponent', () => {
  let component: AgencyAdminGivenmedicationReportComponent;
  let fixture: ComponentFixture<AgencyAdminGivenmedicationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminGivenmedicationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminGivenmedicationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
