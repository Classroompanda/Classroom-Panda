import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminEventPlannerComponent } from './agency-admin-event-planner.component';

describe('AgencyAdminEventPlannerComponent', () => {
  let component: AgencyAdminEventPlannerComponent;
  let fixture: ComponentFixture<AgencyAdminEventPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminEventPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminEventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
