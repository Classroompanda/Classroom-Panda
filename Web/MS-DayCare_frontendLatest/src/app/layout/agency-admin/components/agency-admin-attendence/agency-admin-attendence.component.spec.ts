import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAttendenceComponent } from './agency-admin-attendence.component';

describe('AgencyAdminAttendenceComponent', () => {
  let component: AgencyAdminAttendenceComponent;
  let fixture: ComponentFixture<AgencyAdminAttendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAttendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
