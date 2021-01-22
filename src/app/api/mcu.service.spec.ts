import { TestBed } from '@angular/core/testing';

import { McuService } from './mcu.service';

describe('McuService', () => {
  let service: McuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
