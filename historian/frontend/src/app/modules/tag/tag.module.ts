import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TagDashboardComponent } from './tag-dashboard/tag-dashboard.component';
import { TagTreeComponent } from './tag-tree/tag-tree.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagHelpComponent } from './tag-help/tag-help.component';
import { TagDataviewComponent } from './tag-dataview/tag-dataview.component';
import { TagCellComponent } from './tag-dataview/tag-cell/tag-cell.component';
import { TagListComponent } from './tag-dataview/tag-list/tag-list.component';
import { HistorianTagTreeComponent } from './historian-tag-tree/historian-tag-tree.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistorianTagTreeComponent,
  ],
  declarations: [
    TagTreeComponent,
    TagDashboardComponent,
    TagFormComponent,
    TagHelpComponent,
    TagDataviewComponent,
    TagCellComponent,
    TagListComponent,
    HistorianTagTreeComponent,
  ],
  providers: [],
})
export class TagModule { }
