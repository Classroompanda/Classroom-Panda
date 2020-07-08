import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentUserManagementComponent } from './parent-user-management.component';

describe('ParentUserManagementComponent', () => {
  let component: ParentUserManagementComponent;
  let fixture: ComponentFixture<ParentUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
