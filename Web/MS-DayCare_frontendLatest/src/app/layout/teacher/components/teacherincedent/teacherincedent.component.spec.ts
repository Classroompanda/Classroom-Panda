  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherincedentComponent } from './teacherincedent.component';

describe('TeacherincedentComponent', () => {
  let component: TeacherincedentComponent;
  let fixture: ComponentFixture<TeacherincedentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherincedentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherincedentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
