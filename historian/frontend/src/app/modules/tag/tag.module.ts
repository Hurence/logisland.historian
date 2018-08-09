import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TagFormComponent } from './tag-form/multiple-tag-form/tag-form.component';
import { TagHelpComponent } from './tag-help/tag-help.component';
import { TagDataviewComponent } from './tag-dataview/tag-dataview.component';
import { TagCellComponent } from './tag-dataview/tag-cell/tag-cell.component';
import { TagListComponent } from './tag-dataview/tag-list/tag-list.component';
import { HistorianTagTreeComponent } from './tag-tree/historian-tag-tree/historian-tag-tree.component';
import { OpcTagTreeComponent } from './tag-tree/opc-tag-tree/opc-tag-tree.component';
import { AddTagFormComponent } from './tag-form/add-tag-form/add-tag-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistorianTagTreeComponent,
    OpcTagTreeComponent,
    AddTagFormComponent,
    TagDataviewComponent,
  ],
  declarations: [
    TagFormComponent,
    TagHelpComponent,
    TagDataviewComponent,
    TagCellComponent,
    TagListComponent,
    HistorianTagTreeComponent,
    OpcTagTreeComponent,
    AddTagFormComponent,
  ],
  providers: [],
})
export class TagModule { }
