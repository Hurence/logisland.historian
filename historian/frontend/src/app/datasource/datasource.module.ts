import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceService } from './datasource.service';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { DatasourceFormComponent } from './datasource-form/datasource-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent,
    DatasourceFormComponent
  ],
  providers: [
    DatasourceService,
  ],
})
export class DatasourceModule { }
