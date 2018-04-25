import { TestBed, inject } from '@angular/core/testing';

import { DatasourceService } from './datasource.service';
import { HttpClientModule } from '@angular/common/http';

describe('DatasourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasourceService],
      imports: [
        HttpClientModule,
      ]
    });
  });

  it('should be created', inject([DatasourceService], (service: DatasourceService) => {
    expect(service).toBeTruthy();
  }));
});
