import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatasourceDashboardComponent } from './datasource-dashboard/datasource-dashboard.component';
import { DatasourceFormComponent } from './datasource-form/datasource-form.component';
import { DatasourceService } from './datasource.service';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { DatasourceSearchComponent } from './datasource-search/datasource-search.component';
import { DialogService } from '../dialog.service';
import { DatasourceHelpComponent } from './datasource-help/datasource-help.component';
import { ProfilService } from '../profil/profil.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DatasourceDashboardComponent,
    DatasourcesListComponent,
    DatasourceFormComponent,
    DatasourceSearchComponent,
    DatasourceHelpComponent
  ],
  providers: [
    DatasourceService,
    DialogService,
    ProfilService,
  ],
})
export class DatasourceModule { }
