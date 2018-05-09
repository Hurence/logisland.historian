import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { ConfigurationComponent } from './configuration/configuration.component';
 
const sourcesAndTagsRoutes: Routes = [
  {
    path: 'sources-and-tags',
    component: SourcesAndTagsComponent,
    children: [
      { path: 'datasources',  component: DatasourcesListComponent },
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