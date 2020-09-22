import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminMsgBrodcastComponent } from './agency-admin-msg-brodcast.component';

describe('AgencyAdminMsgBrodcastComponent', () => {
  let component: AgencyAdminMsgBrodcastComponent;
  let fixture: ComponentFixture<AgencyAdminMsgBrodcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminMsgBrodcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminMsgBrodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
