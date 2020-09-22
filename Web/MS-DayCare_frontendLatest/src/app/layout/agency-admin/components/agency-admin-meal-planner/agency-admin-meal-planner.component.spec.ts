import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminMealPlannerComponent } from './agency-admin-meal-planner.component';

describe('AgencyAdminMealPlannerComponent', () => {
  let component: AgencyAdminMealPlannerComponent;
  let fixture: ComponentFixture<AgencyAdminMealPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminMealPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminMealPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
