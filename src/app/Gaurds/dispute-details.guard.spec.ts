import { TestBed } from '@angular/core/testing';

import { DisputeDetailsGuard } from './dispute-details.guard';

describe('DisputeDetailsGuard', () => {
  let guard: DisputeDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisputeDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
