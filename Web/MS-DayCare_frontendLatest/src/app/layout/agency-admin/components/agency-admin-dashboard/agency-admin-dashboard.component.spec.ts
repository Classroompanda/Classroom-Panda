import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminDashboardComponent } from './agency-admin-dashboard.component';

describe('DashboardComponent', () => {
  let component: AgencyAdminDashboardComponent;
  let fixture: ComponentFixture<AgencyAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
