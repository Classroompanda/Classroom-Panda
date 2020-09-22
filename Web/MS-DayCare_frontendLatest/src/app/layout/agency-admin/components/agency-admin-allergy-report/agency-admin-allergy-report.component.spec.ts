import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAllergyReportComponent } from './agency-admin-allergy-report.component';

describe('AgencyAdminAllergyReportComponent', () => {
  let component: AgencyAdminAllergyReportComponent;
  let fixture: ComponentFixture<AgencyAdminAllergyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAllergyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAllergyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
