import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardSelectionComponent } from './dashboard-selection/dashboard-selection.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    DashboardSelectionComponent,
  ],
  declarations: [
    DashboardSelectionComponent,
    DashboardFormComponent,
  ]
})
export class DashboardModule { }
