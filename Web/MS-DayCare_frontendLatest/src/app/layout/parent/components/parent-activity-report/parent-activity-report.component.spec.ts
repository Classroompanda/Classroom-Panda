import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentActivityReportComponent } from './parent-activity-report.component';

describe('ParentActivityReportComponent', () => {
  let component: ParentActivityReportComponent;
  let fixture: ComponentFixture<ParentActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
