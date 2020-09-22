import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminReportsComponent } from './agency-admin-reports.component';

describe('AgencyAdminReportsComponent', () => {
  let component: AgencyAdminReportsComponent;
  let fixture: ComponentFixture<AgencyAdminReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
