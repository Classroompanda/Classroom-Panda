import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoVideoComponent } from './add-info-video.component';

describe('AddInfoVideoComponent', () => {
  let component: AddInfoVideoComponent;
  let fixture: ComponentFixture<AddInfoVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInfoVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
