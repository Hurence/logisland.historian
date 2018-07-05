import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '../../dialog/dialog.module';
import { SharedModule } from '../../shared/shared.module';
import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceFormComponent } from './datasource-form/datasource-form.component';
import { DatasourceHelpComponent } from './datasource-help/datasource-help.component';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { TagModule } from '../tag/tag.module';

@NgModule({
  imports: [
    DialogModule,
    SharedModule,
    TagModule,
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent,
    DatasourceFormComponent,
    DatasourceHelpComponent
  ],
  providers: [],
})
export class DatasourceModule { }
