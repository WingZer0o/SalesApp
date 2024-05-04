import { TestBed } from '@angular/core/testing';

import { ChatMainFooterService } from './chat-main-footer.service';

describe('ChatMainFooterService', () => {
  let service: ChatMainFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMainFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
