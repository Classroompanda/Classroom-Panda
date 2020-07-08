import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminBusReportComponent } from './agency-admin-bus-report.component';

describe('AgencyAdminBusReportComponent', () => {
  let component: AgencyAdminBusReportComponent;
  let fixture: ComponentFixture<AgencyAdminBusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminBusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminBusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
