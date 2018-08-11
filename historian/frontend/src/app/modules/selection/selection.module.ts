import { NgModule } from '@angular/core';

import { SelectionDashboardComponent } from './selection-dashboard/selection-dashboard.component';
import { SelectionFormComponent } from './selection-form/selection-form.component';
import { SharedModule } from '../../shared/shared.module';
import { TagModule } from '../tag/tag.module';
import { TagsSelectionSelectionComponent } from './tags-selection-selection/tags-selection-selection.component';

@NgModule({
  imports: [
    SharedModule,
    TagModule,
  ],
  exports: [
    SelectionDashboardComponent,
    TagsSelectionSelectionComponent,
  ],
  declarations: [
    SelectionDashboardComponent,
    SelectionFormComponent,
    TagsSelectionSelectionComponent,
  ]
})
export class SelectionModule { }
