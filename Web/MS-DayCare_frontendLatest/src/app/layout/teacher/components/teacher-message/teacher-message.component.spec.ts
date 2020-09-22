import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMessageComponent } from './teacher-message.component';

describe('TeacherMessageComponent', () => {
  let component: TeacherMessageComponent;
  let fixture: ComponentFixture<TeacherMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
