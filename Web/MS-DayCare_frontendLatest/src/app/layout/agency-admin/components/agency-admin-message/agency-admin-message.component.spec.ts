import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminMessageComponent } from './agency-admin-message.component';

describe('AgencyAdminMessageComponent', () => {
  let component: AgencyAdminMessageComponent;
  let fixture: ComponentFixture<AgencyAdminMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
