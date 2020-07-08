import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminSettingsComponent } from './agency-admin-settings.component';

describe('AgencyAdminSettingsComponent', () => {
  let component: AgencyAdminSettingsComponent;
  let fixture: ComponentFixture<AgencyAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
