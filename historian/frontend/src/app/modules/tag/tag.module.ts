import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TagHelpComponent } from './tag-help/tag-help.component';
import { TagDataviewComponent } from './tag-dataview/tag-dataview.component';
import { TagCellComponent } from './tag-dataview/tag-cell/tag-cell.component';
import { TagListComponent } from './tag-dataview/tag-list/tag-list.component';
import { HistorianTagTreeComponent } from './tag-tree/historian-tag-tree/historian-tag-tree.component';
import { OpcTagTreeAutomaticComponent } from './tag-tree/opc-tag-tree/opc-tag-tree-automatic/opc-tag-tree-automatic.component';
import { OpcTagTreeManualComponent } from './tag-tree/opc-tag-tree/opc-tag-tree-manual/opc-tag-tree-manual.component';
import { AddTagFormComponent } from './tag-form/add-tag-form/add-tag-form.component';
import { EditTagFormComponent } from './tag-form/edit-tag-form/edit-tag-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistorianTagTreeComponent,
    OpcTagTreeAutomaticComponent,
    OpcTagTreeManualComponent,
    AddTagFormComponent,
    TagDataviewComponent,
  ],
  declarations: [
    TagHelpComponent,
    TagDataviewComponent,
    TagCellComponent,
    TagListComponent,
    HistorianTagTreeComponent,
    OpcTagTreeAutomaticComponent,
    OpcTagTreeManualComponent,
    AddTagFormComponent,
    EditTagFormComponent,
  ],
  providers: [],
})
export class TagModule { }
