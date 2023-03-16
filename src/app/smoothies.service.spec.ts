import { TestBed } from '@angular/core/testing';

import { SmoothiesService } from './smoothies.service';

describe('SmoothiesService', () => {
  let service: SmoothiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
