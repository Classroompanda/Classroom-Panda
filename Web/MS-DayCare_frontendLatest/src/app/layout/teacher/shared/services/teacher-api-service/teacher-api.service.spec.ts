import { TestBed, inject } from '@angular/core/testing';

import { TeacherApiService } from './teacher-api.service';

describe('TeacherApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherApiService]
    });
  });

  it('should be created', inject([TeacherApiService], (service: TeacherApiService) => {
    expect(service).toBeTruthy();
  }));
});
