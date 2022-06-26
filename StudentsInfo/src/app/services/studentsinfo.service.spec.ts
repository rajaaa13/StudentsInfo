import { TestBed } from '@angular/core/testing';

import { StudentsinfoService } from './studentsinfo.service';

describe('StudentsinfoService', () => {
  let service: StudentsinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
