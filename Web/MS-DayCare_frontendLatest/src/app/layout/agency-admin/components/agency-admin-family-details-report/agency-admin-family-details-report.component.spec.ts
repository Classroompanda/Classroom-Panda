import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminFamilyDetailsReportComponent } from './agency-admin-family-details-report.component';

describe('AgencyAdminFamilyDetailsReportComponent', () => {
  let component: AgencyAdminFamilyDetailsReportComponent;
  let fixture: ComponentFixture<AgencyAdminFamilyDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminFamilyDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminFamilyDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
