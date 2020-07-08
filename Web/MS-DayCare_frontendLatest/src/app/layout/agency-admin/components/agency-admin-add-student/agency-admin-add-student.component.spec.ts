import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAddStudentComponent } from './agency-admin-add-student.component';

describe('AgencyAdminAddStudentComponent', () => {
  let component: AgencyAdminAddStudentComponent;
  let fixture: ComponentFixture<AgencyAdminAddStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAddStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
