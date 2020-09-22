import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminNewmealplannerComponent } from './agency-admin-newmealplanner.component';

describe('AgencyAdminNewmealplannerComponent', () => {
  let component: AgencyAdminNewmealplannerComponent;
  let fixture: ComponentFixture<AgencyAdminNewmealplannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminNewmealplannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminNewmealplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
