import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminKiosklogReportComponent } from './agency-admin-kiosklog-report.component';

describe('AgencyAdminKiosklogReportComponent', () => {
  let component: AgencyAdminKiosklogReportComponent;
  let fixture: ComponentFixture<AgencyAdminKiosklogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminKiosklogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminKiosklogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
