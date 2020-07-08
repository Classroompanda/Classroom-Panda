import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEventPlannerComponent } from './parent-event-planner.component';

describe('ParentEventPlannerComponent', () => {
  let component: ParentEventPlannerComponent;
  let fixture: ComponentFixture<ParentEventPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentEventPlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
