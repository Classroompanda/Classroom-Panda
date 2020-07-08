import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminProfileComponent } from './agency-admin-profile.component';

describe('AgencyAdminProfileComponent', () => {
  let component: AgencyAdminProfileComponent;
  let fixture: ComponentFixture<AgencyAdminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
