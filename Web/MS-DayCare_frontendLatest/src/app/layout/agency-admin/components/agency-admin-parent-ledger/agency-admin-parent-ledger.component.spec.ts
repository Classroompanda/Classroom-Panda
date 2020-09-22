import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminParentLedgerComponent } from './agency-admin-parent-ledger.component';

describe('AgencyAdminParentLedgerComponent', () => {
  let component: AgencyAdminParentLedgerComponent;
  let fixture: ComponentFixture<AgencyAdminParentLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminParentLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminParentLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
