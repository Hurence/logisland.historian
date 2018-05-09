import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceService } from './datasource.service';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent
  ],
  providers: [
    DatasourceService,
  ],
})
export class DatasourceModule { }
