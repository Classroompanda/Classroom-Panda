import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentbreakComponent } from './teacher-studentbreak.component';

describe('TeacherStudentbreakComponent', () => {
  let component: TeacherStudentbreakComponent;
  let fixture: ComponentFixture<TeacherStudentbreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentbreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentbreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
