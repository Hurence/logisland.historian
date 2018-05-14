import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
}                           from '@angular/router';
import { DatasetService } from '../dataset/dataset.service.';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

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