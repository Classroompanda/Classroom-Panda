import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminSubsidyComponent } from './agency-admin-subsidy.component';

describe('AgencyAdminSubsidyComponent', () => {
  let component: AgencyAdminSubsidyComponent;
  let fixture: ComponentFixture<AgencyAdminSubsidyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminSubsidyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminSubsidyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
