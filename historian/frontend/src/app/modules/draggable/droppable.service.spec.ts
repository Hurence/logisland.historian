import { TestBed } from '@angular/core/testing';

import { DroppableService } from './droppable.service';

describe('DroppableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DroppableService = TestBed.get(DroppableService);
    expect(service).toBeTruthy();
  });
});
