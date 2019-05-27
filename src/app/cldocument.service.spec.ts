import { TestBed } from '@angular/core/testing';

import { CldocumentService } from './cldocument.service';

describe('CldocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CldocumentService = TestBed.get(CldocumentService);
    expect(service).toBeTruthy();
  });
});
