import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceFormComponent } from './datasource-form/datasource-form.component';
import { DatasourceService } from './datasource.service';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { DatasourceSearchComponent } from './datasource-search/datasource-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent,
    DatasourceFormComponent,
    DatasourceSearchComponent
  ],
  providers: [
    DatasourceService,
  ],
})
export class DatasourceModule { }