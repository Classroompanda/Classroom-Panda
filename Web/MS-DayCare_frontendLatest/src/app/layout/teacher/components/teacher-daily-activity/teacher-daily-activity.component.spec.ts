import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDailyActivityComponent } from './teacher-daily-activity.component';

describe('TeacherDailyActivityComponent', () => {
  let component: TeacherDailyActivityComponent;
  let fixture: ComponentFixture<TeacherDailyActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDailyActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDailyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
