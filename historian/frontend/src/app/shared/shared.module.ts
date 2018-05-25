import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    SearchComponent,
    ButtonLabelledComponent,
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
  ]
})
export class SharedModule { }
