import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminAddFeesComponent } from './agency-admin-add-fees.component';

describe('AgencyAdminAddFeesComponent', () => {
  let component: AgencyAdminAddFeesComponent;
  let fixture: ComponentFixture<AgencyAdminAddFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminAddFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminAddFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
