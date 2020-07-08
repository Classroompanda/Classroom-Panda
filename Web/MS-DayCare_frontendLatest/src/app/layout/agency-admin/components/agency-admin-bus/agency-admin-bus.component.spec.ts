import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminBusComponent } from './agency-admin-bus.component';

describe('AgencyAdminBusComponent', () => {
  let component: AgencyAdminBusComponent;
  let fixture: ComponentFixture<AgencyAdminBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
