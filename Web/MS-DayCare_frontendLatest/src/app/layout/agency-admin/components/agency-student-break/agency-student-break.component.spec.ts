import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyStudentBreakComponent } from './agency-student-break.component';

describe('AgencyStudentBreakComponent', () => {
  let component: AgencyStudentBreakComponent;
  let fixture: ComponentFixture<AgencyStudentBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyStudentBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyStudentBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
