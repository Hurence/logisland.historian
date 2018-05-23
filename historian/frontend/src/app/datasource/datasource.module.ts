import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '../dialog/dialog.module';
import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceFormComponent } from './datasource-form/datasource-form.component';
import { DatasourceHelpComponent } from './datasource-help/datasource-help.component';
import { DatasourceSearchComponent } from './datasource-search/datasource-search.component';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent,
    DatasourceFormComponent,
    DatasourceSearchComponent,
    DatasourceHelpComponent
  ],
  providers: [],
})
export class DatasourceModule { }
