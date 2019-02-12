import { TestBed } from '@angular/core/testing';

import { EditPostService } from './edit-post.service';

describe('EditPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditPostService = TestBed.get(EditPostService);
    expect(service).toBeTruthy();
  });
});
