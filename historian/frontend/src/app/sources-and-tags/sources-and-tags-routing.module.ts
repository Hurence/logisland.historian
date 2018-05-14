import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagsListComponent } from '../tag/tags-list/tags-list.component';
import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceDashboardComponent } from '../datasource/datasource-dashboard/datasource-dashboard.component';
import { TagsGuard } from './tags-guard';
import { ConfigurationGuard } from './configuration-guard';

const sourcesAndTagsRoutes: Routes = [
  {
    path: 'sources-and-tags',
    component: SourcesAndTagsComponent,
    children: [
      {
        path: 'datasources',
        component: DatasourceDashboardComponent },
      {
        path: 'tags',
        component: TagsListComponent ,
        canActivate: [TagsGuard],
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
        canActivate: [ConfigurationGuard],
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
  ],
  exports: [
    RouterModule
  ]
})
export class SourcesAndTagsRoutingModule { }
