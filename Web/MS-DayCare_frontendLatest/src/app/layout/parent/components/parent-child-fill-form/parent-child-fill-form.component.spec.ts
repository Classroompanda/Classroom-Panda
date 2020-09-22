import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildFillFormComponent } from './parent-child-fill-form.component';

describe('ParentChildFillFormComponent', () => {
  let component: ParentChildFillFormComponent;
  let fixture: ComponentFixture<ParentChildFillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildFillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildFillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
