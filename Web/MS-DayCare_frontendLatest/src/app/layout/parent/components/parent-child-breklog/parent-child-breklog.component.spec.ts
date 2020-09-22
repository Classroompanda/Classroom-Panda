import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildBreklogComponent } from './parent-child-breklog.component';

describe('ParentChildBreklogComponent', () => {
  let component: ParentChildBreklogComponent;
  let fixture: ComponentFixture<ParentChildBreklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildBreklogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildBreklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
