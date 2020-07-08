import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBreaksComponent } from './teacher-breaks.component';

describe('TeacherBreaksComponent', () => {
  let component: TeacherBreaksComponent;
  let fixture: ComponentFixture<TeacherBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherBreaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
