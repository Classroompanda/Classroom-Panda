import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyStudentDetailsComponent } from './agency-student-details.component';

describe('AgencyStudentDetailsComponent', () => {
  let component: AgencyStudentDetailsComponent;
  let fixture: ComponentFixture<AgencyStudentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyStudentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
