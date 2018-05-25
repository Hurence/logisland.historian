import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    SearchComponent,
  ],
  declarations: [
    SearchComponent,
  ]
})
export class SharedModule { }
