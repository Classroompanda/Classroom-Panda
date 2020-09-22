import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRestrictedPersonComponent } from './global-restricted-person.component';

describe('GlobalRestrictedPersonComponent', () => {
  let component: GlobalRestrictedPersonComponent;
  let fixture: ComponentFixture<GlobalRestrictedPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalRestrictedPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalRestrictedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
