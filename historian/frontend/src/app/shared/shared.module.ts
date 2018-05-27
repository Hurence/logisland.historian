import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';

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
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
  ]
})
export class SharedModule { }
