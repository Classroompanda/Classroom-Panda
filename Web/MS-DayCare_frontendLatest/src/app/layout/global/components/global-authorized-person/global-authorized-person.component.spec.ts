import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAuthorizedPersonComponent } from './global-authorized-person.component';

describe('GlobalAuthorizedPersonComponent', () => {
  let component: GlobalAuthorizedPersonComponent;
  let fixture: ComponentFixture<GlobalAuthorizedPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAuthorizedPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAuthorizedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
