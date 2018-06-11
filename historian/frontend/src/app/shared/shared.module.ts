import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsTreeComponent } from './js-tree/js-tree.component';
import { SearchComponent } from './search/search.component';

import {ChartModule} from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    JsTreeComponent,
    ChartModule,
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    JsTreeComponent,
  ]
})
export class SharedModule { }
