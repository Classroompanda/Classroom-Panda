import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAccledgerReportComponent } from './agency-accledger-report.component';

describe('AgencyAccledgerReportComponent', () => {
  let component: AgencyAccledgerReportComponent;
  let fixture: ComponentFixture<AgencyAccledgerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAccledgerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAccledgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
