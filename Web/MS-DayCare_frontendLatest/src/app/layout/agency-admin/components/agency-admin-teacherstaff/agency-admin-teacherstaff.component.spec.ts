import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminTeacherstaffComponent } from './agency-admin-teacherstaff.component';

describe('AgencyAdminTeacherstaffComponent', () => {
  let component: AgencyAdminTeacherstaffComponent;
  let fixture: ComponentFixture<AgencyAdminTeacherstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminTeacherstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminTeacherstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
