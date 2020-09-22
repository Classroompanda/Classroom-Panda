import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentKioskComponent } from './parent-kiosk.component';

describe('ParentKioskComponent', () => {
  let component: ParentKioskComponent;
  let fixture: ComponentFixture<ParentKioskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentKioskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
