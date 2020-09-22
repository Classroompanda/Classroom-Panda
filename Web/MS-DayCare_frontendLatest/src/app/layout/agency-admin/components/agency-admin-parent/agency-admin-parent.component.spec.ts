import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminParentComponent } from './agency-admin-parent.component';

describe('AgencyAdminParentComponent', () => {
  let component: AgencyAdminParentComponent;
  let fixture: ComponentFixture<AgencyAdminParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
