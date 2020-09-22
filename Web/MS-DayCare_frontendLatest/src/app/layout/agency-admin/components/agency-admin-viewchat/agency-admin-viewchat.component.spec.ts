import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminViewchatComponent } from './agency-admin-viewchat.component';

describe('AgencyAdminViewchatComponent', () => {
  let component: AgencyAdminViewchatComponent;
  let fixture: ComponentFixture<AgencyAdminViewchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminViewchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminViewchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
