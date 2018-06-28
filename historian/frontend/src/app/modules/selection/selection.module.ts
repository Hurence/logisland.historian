import { NgModule } from '@angular/core';

import { SelectionDashboardComponent } from './selection-dashboard/selection-dashboard.component';
import { SelectionFormComponent } from './selection-form/selection-form.component';
import { SharedModule } from '../../shared/shared.module';
import { TagModule } from '../tag/tag.module';

@NgModule({
  imports: [
    SharedModule,
    TagModule,
  ],
  exports: [
    SelectionDashboardComponent,
  ],
  declarations: [
    SelectionDashboardComponent,
    SelectionFormComponent,
  ]
})
export class SelectionModule { }
