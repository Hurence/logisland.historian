import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceDashboardComponent } from '../datasource/datasource-dashboard/datasource-dashboard.component';
import { ConfigurationGuard } from './configuration-guard';
import { CanDeactivateGuard } from '../../shared/can-deactivate-guard.service';

const sourcesAndTagsRoutes: Routes = [
  {
    path: 'sources-and-tags',
    component: SourcesAndTagsComponent,
    children: [
      {
        path: 'datasources',
        component: DatasourceDashboardComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
        canActivate: [ConfigurationGuard],
      },
      {
        path: '',
        redirectTo: 'datasources',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sourcesAndTagsRoutes)
  ],
  providers: [
    ConfigurationGuard,
    CanDeactivateGuard
  ],
  exports: [
    RouterModule
  ]
})
export class SourcesAndTagsRoutingModule { }
