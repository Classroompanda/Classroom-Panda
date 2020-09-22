import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminStudentListComponent } from './agency-admin-student-list.component';

describe('AgencyAdminStudentListComponent', () => {
  let component: AgencyAdminStudentListComponent;
  let fixture: ComponentFixture<AgencyAdminStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
