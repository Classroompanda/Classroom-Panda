import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminClasstransferreportComponent } from './agency-admin-classtransferreport.component';

describe('AgencyAdminClasstransferreportComponent', () => {
  let component: AgencyAdminClasstransferreportComponent;
  let fixture: ComponentFixture<AgencyAdminClasstransferreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminClasstransferreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminClasstransferreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
