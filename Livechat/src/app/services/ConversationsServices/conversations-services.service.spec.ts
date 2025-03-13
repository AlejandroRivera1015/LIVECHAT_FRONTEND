import { TestBed } from '@angular/core/testing';

import { ConversationsServicesService } from './conversations-services.service';

describe('ConversationsServicesService', () => {
  let service: ConversationsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
