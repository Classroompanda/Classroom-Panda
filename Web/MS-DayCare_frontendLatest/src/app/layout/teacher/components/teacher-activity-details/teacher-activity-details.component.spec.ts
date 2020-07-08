import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherActivityDetailsComponent } from './teacher-activity-details.component';

describe('TeacherActivityDetailsComponent', () => {
  let component: TeacherActivityDetailsComponent;
  let fixture: ComponentFixture<TeacherActivityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherActivityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherActivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
