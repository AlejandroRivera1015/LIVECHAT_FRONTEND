import { TestBed } from '@angular/core/testing';

import { LivechatUserService } from './livechat-user.service';

describe('LivechatUserService', () => {
  let service: LivechatUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivechatUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
