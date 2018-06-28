import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SearchComponent } from './search/search.component';
import { DynamicFormQuestionArrayComponent } from './dynamic-form/dynamic-form-question-array/dynamic-form-question-array.component';

import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
    DataViewModule,
    DropdownModule,
    MenuModule,
    PanelMenuModule,
    FormsModule,
    PanelModule,
    DialogModule,
    TreeModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ChartModule,
    DataViewModule,
    DropdownModule,
    MenuModule,
    PanelMenuModule,
    FormsModule,
    PanelModule,
    DialogModule,
    TreeModule,
  ],
  providers: [
    TreeDragDropService,
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    DynamicFormQuestionArrayComponent,
  ],
})
export class SharedModule { }
