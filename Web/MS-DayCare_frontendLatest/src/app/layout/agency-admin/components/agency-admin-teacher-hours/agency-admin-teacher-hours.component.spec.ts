import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminTeacherHoursComponent } from './agency-admin-teacher-hours.component';

describe('AgencyAdminTeacherHoursComponent', () => {
  let component: AgencyAdminTeacherHoursComponent;
  let fixture: ComponentFixture<AgencyAdminTeacherHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminTeacherHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminTeacherHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
