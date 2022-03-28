import { TestBed } from '@angular/core/testing';

import { PartService } from './part.service';

describe('PartServiceService', () => {
  let service: PartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
