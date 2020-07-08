import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAcceptListComponent } from './policy-accept-list.component';

describe('PolicyAcceptListComponent', () => {
  let component: PolicyAcceptListComponent;
  let fixture: ComponentFixture<PolicyAcceptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAcceptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAcceptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
