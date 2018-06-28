import { TestBed, inject } from '@angular/core/testing';

import { NgTreenodeService } from './ng-treenode.service';

describe('NgTreenodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgTreenodeService]
    });
  });

  it('should be created', inject([NgTreenodeService], (service: NgTreenodeService) => {
    expect(service).toBeTruthy();
  }));
});
