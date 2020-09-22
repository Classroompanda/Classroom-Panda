import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskLoginComponent } from './kiosk-login.component';

describe('KioskLoginComponent', () => {
  let component: KioskLoginComponent;
  let fixture: ComponentFixture<KioskLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
