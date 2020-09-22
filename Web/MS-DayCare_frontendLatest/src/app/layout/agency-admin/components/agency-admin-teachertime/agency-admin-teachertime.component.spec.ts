import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminTeachertimeComponent } from './agency-admin-teachertime.component';

describe('AgencyAdminTeachertimeComponent', () => {
  let component: AgencyAdminTeachertimeComponent;
  let fixture: ComponentFixture<AgencyAdminTeachertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminTeachertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminTeachertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
