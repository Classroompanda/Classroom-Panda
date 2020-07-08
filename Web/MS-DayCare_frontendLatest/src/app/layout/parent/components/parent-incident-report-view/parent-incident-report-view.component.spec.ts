import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentIncidentReportViewComponent } from './parent-incident-report-view.component';

describe('ParentIncidentReportViewComponent', () => {
  let component: ParentIncidentReportViewComponent;
  let fixture: ComponentFixture<ParentIncidentReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentIncidentReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentIncidentReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
