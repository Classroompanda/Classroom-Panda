import { TestBed, inject } from '@angular/core/testing';

import { AgencyApiService } from './agency-api.service';

describe('AgencyApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyApiService]
    });
  });

  it('should be created', inject([AgencyApiService], (service: AgencyApiService) => {
    expect(service).toBeTruthy();
  }));
});
