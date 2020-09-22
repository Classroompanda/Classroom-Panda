import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendenceComponent } from './teacher-attendence.component';

describe('TeacherAttendenceComponent', () => {
  let component: TeacherAttendenceComponent;
  let fixture: ComponentFixture<TeacherAttendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAttendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
