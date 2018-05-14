import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DatasetService } from '../dataset/dataset.service.';

@Injectable()
export class ConfigurationGuard implements CanActivate {

  constructor(private datasetService: DatasetService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(false);
  }
}
