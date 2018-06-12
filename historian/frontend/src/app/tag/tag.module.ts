import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TagDashboardComponent } from './tag-dashboard/tag-dashboard.component';
import { TagTreeComponent } from './tag-tree/tag-tree.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagHelpComponent } from './tag-help/tag-help.component';
import { TagDataviewComponent } from './tag-dataview/tag-dataview.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    TagTreeComponent,
    TagDashboardComponent,
    TagFormComponent,
    TagHelpComponent,
    TagDataviewComponent,
  ],
  providers: [],
})
export class TagModule { }
