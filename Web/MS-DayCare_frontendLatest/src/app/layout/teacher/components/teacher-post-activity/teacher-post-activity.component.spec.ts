import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPostActivityComponent } from './teacher-post-activity.component';

describe('TeacherPostActivityComponent', () => {
  let component: TeacherPostActivityComponent;
  let fixture: ComponentFixture<TeacherPostActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPostActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPostActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
