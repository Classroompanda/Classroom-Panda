import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminActivitydetailComponent } from './agency-admin-activitydetail.component';

describe('AgencyAdminActivitydetailComponent', () => {
  let component: AgencyAdminActivitydetailComponent;
  let fixture: ComponentFixture<AgencyAdminActivitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminActivitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminActivitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
