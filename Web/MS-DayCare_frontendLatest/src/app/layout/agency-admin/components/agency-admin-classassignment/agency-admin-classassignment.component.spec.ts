import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminClassassignmentComponent } from './agency-admin-classassignment.component';

describe('AgencyAdminClassassignmentComponent', () => {
  let component: AgencyAdminClassassignmentComponent;
  let fixture: ComponentFixture<AgencyAdminClassassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminClassassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminClassassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
