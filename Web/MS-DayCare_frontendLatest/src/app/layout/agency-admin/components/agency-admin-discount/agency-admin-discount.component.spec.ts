import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminDiscountComponent } from './agency-admin-discount.component';

describe('AgencyAdminDiscountComponent', () => {
  let component: AgencyAdminDiscountComponent;
  let fixture: ComponentFixture<AgencyAdminDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
