import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminClassesComponent } from './agency-admin-classes.component';

describe('AgencyAdminClassesComponent', () => {
  let component: AgencyAdminClassesComponent;
  let fixture: ComponentFixture<AgencyAdminClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
