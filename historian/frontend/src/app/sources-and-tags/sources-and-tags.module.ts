import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SourcesAndTagsComponent } from './sources-and-tags.component';
import { SourcesAndTagsRoutingModule } from './sources-and-tags-routing.module';
import { TagsListComponent } from '../tag/tags-list/tags-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DatasourceModule } from '../datasource/datasource.module';
import { TagModule } from '../tag/tag.module';
import { DatasetService } from '../dataset/dataset.service.';

@NgModule({
  imports: [
    CommonModule,
    DatasourceModule,
    TagModule,
    SourcesAndTagsRoutingModule
  ],
  declarations: [
    SourcesAndTagsComponent,    
    ConfigurationComponent
  ],
  providers: [
    DatasetService,
  ]
})
export class SourcesAndTagsModule {}
