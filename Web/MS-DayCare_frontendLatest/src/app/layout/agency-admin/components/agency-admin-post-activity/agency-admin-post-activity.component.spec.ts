import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminPostActivityComponent } from './agency-admin-post-activity.component';

describe('AgencyAdminPostActivityComponent', () => {
  let component: AgencyAdminPostActivityComponent;
  let fixture: ComponentFixture<AgencyAdminPostActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminPostActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminPostActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
