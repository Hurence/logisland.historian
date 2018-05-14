import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatasetService } from '../dataset/dataset.service.';
import { DatasourceModule } from '../datasource/datasource.module';
import { TagModule } from '../tag/tag.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SourcesAndTagsRoutingModule } from './sources-and-tags-routing.module';
import { SourcesAndTagsComponent } from './sources-and-tags.component';

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
  ],st
  providers: [
    DatasetService,
  ]
})
export class SourcesAndTagsModule { }
