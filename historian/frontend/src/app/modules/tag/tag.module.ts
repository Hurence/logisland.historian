import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagHelpComponent } from './tag-help/tag-help.component';
import { TagDataviewComponent } from './tag-dataview/tag-dataview.component';
import { TagCellComponent } from './tag-dataview/tag-cell/tag-cell.component';
import { TagListComponent } from './tag-dataview/tag-list/tag-list.component';
import { HistorianTagTreeComponent } from './tag-tree/historian-tag-tree/historian-tag-tree.component';
import { OpcTagTreeComponent } from './tag-tree/opc-tag-tree/opc-tag-tree.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistorianTagTreeComponent,
    OpcTagTreeComponent,
  ],
  declarations: [
    TagFormComponent,
    TagHelpComponent,
    TagDataviewComponent,
    TagCellComponent,
    TagListComponent,
    HistorianTagTreeComponent,
    OpcTagTreeComponent,
  ],
  providers: [],
})
export class TagModule { }
