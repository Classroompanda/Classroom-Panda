import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminMealServereportComponent } from './agency-admin-mealservereport.component';

describe('AgencyAdminMealServereportComponent', () => {
  let component: AgencyAdminMealServereportComponent;
  let fixture: ComponentFixture<AgencyAdminMealServereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminMealServereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminMealServereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
