import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsTreeComponent } from './js-tree/js-tree.component';
import { SearchComponent } from './search/search.component';
import { DynamicFormQuestionArrayComponent } from './dynamic-form/dynamic-form-question-array/dynamic-form-question-array.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    JsTreeComponent,
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    JsTreeComponent,
    DynamicFormQuestionArrayComponent,
  ]
})
export class SharedModule { }
