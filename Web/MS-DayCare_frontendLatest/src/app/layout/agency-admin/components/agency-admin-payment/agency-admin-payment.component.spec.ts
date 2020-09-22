import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminPaymentComponent } from './agency-admin-payment.component';

describe('AgencyAdminPaymentComponent', () => {
  let component: AgencyAdminPaymentComponent;
  let fixture: ComponentFixture<AgencyAdminPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
