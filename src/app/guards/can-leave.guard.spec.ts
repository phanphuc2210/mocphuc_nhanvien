import { TestBed } from '@angular/core/testing';

import { CanLeaveGuard } from './can-leave.guard';

describe('CanLeaveGuard', () => {
  let guard: CanLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
