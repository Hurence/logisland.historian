import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { SourcesAndTagsRoutingModule } from './sources-and-tags-routing.module';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SourcesAndTagsRoutingModule
  ],
  declarations: [
    SourcesAndTagsComponent,
    DatasourcesListComponent,
    TagsListComponent,
    ConfigurationComponent
  ],
  providers: []
})
export class SourcesAndTagsModule {}
