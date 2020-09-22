import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMealPlannerComponent } from './teacher-meal-planner.component';

describe('TeacherMealPlannerComponent', () => {
  let component: TeacherMealPlannerComponent;
  let fixture: ComponentFixture<TeacherMealPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMealPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMealPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
