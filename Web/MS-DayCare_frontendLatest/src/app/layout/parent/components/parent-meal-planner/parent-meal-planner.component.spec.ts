import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMealPlannerComponent } from './parent-meal-planner.component';

describe('ParentMealPlannerComponent', () => {
  let component: ParentMealPlannerComponent;
  let fixture: ComponentFixture<ParentMealPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentMealPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMealPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
