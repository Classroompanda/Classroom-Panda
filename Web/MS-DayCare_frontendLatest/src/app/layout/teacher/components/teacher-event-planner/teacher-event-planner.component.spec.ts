import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEventPlannerComponent } from './teacher-event-planner.component';

describe('TeacherEventPlannerComponent', () => {
  let component: TeacherEventPlannerComponent;
  let fixture: ComponentFixture<TeacherEventPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEventPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
