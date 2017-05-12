import { TestBed, inject } from '@angular/core/testing';

import { ProbaService } from './proba.service';

describe('ProbaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProbaService]
    });
  });

  it('should ...', inject([ProbaService], (service: ProbaService) => {
    expect(service).toBeTruthy();
  }));
});
