import { TestBed } from '@angular/core/testing';

import { FriendrequestService } from './friendrequest.service';

describe('FriendrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendrequestService = TestBed.get(FriendrequestService);
    expect(service).toBeTruthy();
  });
});
