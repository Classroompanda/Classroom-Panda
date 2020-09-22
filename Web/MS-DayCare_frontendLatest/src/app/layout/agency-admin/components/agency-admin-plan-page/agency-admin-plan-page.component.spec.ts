import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminPlanPageComponent } from './agency-admin-plan-page.component';

describe('AgencyAdminPlanPageComponent', () => {
  let component: AgencyAdminPlanPageComponent;
  let fixture: ComponentFixture<AgencyAdminPlanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminPlanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
