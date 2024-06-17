import { TestBed } from '@angular/core/testing';

import { RandomcodeService } from './randomcode.service';

describe('RandomcodeService', () => {
  let service: RandomcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
