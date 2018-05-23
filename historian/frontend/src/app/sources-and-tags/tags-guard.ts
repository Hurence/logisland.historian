import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatasetService } from '../dataset/dataset.service.';

@Injectable()
export class TagsGuard implements CanActivate {

  constructor(private datasetService: DatasetService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.datasetService.getMyDataset()
        .pipe(
            map(dataset => !dataset.isEmpty())
        );
  }
}
