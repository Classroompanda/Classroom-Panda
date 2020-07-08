import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAttendanceHistoryComponent } from './parent-attendance-history.component';

describe('ParentAttendanceHistoryComponent', () => {
  let component: ParentAttendanceHistoryComponent;
  let fixture: ComponentFixture<ParentAttendanceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAttendanceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAttendanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
