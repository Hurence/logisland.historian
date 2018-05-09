import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { TagsListComponent } from './tags-list/tags-list.component';
import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceDashboardComponent } from '../datasource/datasource-dashboard/datasource-dashboard.component';
 
const sourcesAndTagsRoutes: Routes = [
  {
    path: 'sources-and-tags',
    component: SourcesAndTagsComponent,
    children: [
      { path: 'datasources',  component: DatasourceDashboardComponent },
      { path: 'tags', component: TagsListComponent },
      { path: 'configuration', component: ConfigurationComponent }
    ]
  }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(sourcesAndTagsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SourcesAndTagsRoutingModule { }