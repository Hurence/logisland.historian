import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { SourcesAndTagsRoutingModule } from './sources-and-tags-routing.module';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceModule } from '../datasource/datasource.module';

@NgModule({
  imports: [
    CommonModule,
    DatasourceModule,
    SourcesAndTagsRoutingModule
  ],
  declarations: [
    SourcesAndTagsComponent,  
    TagsListComponent,
    ConfigurationComponent
  ],
  providers: []
})
export class SourcesAndTagsModule {}
