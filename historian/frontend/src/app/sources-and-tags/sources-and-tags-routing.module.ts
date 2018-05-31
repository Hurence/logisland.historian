import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceDashboardComponent } from '../datasource/datasource-dashboard/datasource-dashboard.component';
import { TagsGuard } from './tags-guard';
import { ConfigurationGuard } from './configuration-guard';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { TagDashboardComponent } from '../tag/tag-dashboard/tag-dashboard.component';

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
        path: 'tags',
        component: TagDashboardComponent ,
        canActivate: [TagsGuard],
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
    TagsGuard,
    ConfigurationGuard,
    CanDeactivateGuard
  ],
  exports: [
    RouterModule
  ]
})
export class SourcesAndTagsRoutingModule { }
