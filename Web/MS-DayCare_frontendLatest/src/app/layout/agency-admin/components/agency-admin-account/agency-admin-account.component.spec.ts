import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAccountComponent } from './agency-admin-account.component';

describe('AgencyAdminAccountComponent', () => {
  let component: AgencyAdminAccountComponent;
  let fixture: ComponentFixture<AgencyAdminAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
