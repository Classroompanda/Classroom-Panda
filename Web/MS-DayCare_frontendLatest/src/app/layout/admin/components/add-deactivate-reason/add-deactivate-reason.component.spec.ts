import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeactivateReasonComponent } from './add-deactivate-reason.component';

describe('AddDeactivateReasonComponent', () => {
  let component: AddDeactivateReasonComponent;
  let fixture: ComponentFixture<AddDeactivateReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeactivateReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeactivateReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
