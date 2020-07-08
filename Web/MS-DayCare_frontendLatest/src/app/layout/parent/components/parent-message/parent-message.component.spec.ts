import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMessageComponent } from './parent-message.component';

describe('ParentMessageComponent', () => {
  let component: ParentMessageComponent;
  let fixture: ComponentFixture<ParentMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
