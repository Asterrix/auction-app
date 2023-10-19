import { TestBed } from '@angular/core/testing';

import { HomeItemsService } from './home-items.service';

describe('HomeItemsService', () => {
  let service: HomeItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
