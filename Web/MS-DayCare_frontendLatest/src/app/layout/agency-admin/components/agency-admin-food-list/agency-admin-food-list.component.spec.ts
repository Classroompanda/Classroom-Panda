import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAdminFoodListComponent } from './agency-admin-food-list.component';

describe('AgencyAdminFoodListComponent', () => {
  let component: AgencyAdminFoodListComponent;
  let fixture: ComponentFixture<AgencyAdminFoodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyAdminFoodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyAdminFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
