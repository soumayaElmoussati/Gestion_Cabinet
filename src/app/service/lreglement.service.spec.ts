import { TestBed } from '@angular/core/testing';

import { LreglementService } from './lreglement.service';

describe('LreglementService', () => {
  let service: LreglementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LreglementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
