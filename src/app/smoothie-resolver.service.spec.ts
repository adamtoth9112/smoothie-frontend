import { TestBed } from '@angular/core/testing';

import { SmoothieResolverService } from './smoothie-resolver.service';

describe('SmoothieResolverService', () => {
  let service: SmoothieResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothieResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
