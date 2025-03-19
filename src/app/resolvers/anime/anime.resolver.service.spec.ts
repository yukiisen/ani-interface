import { TestBed } from '@angular/core/testing';

import { AnimeResolverService } from './anime.resolver.service';

describe('AnimeResolverService', () => {
  let service: AnimeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
