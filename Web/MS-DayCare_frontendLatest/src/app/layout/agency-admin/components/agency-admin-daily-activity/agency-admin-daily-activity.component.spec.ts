import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminDailyActivityComponent } from './agency-admin-daily-activity.component';

describe('AgencyAdminDailyActivityComponent', () => {
  let component: AgencyAdminDailyActivityComponent;
  let fixture: ComponentFixture<AgencyAdminDailyActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminDailyActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminDailyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
