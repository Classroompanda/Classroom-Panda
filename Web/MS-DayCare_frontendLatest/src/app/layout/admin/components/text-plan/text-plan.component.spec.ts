import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPlanComponent } from './text-plan.component';

describe('TextPlanComponent', () => {
  let component: TextPlanComponent;
  let fixture: ComponentFixture<TextPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
