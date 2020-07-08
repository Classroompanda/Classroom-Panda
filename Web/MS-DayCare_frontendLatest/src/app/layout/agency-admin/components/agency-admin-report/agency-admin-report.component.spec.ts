import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminReportComponent } from './agency-admin-report.component';

describe('AgencyAdminReportComponent', () => {
  let component: AgencyAdminReportComponent;
  let fixture: ComponentFixture<AgencyAdminReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
