import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SourcesAndTagsComponent } from './sources-and-tags.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    SourcesAndTagsComponent,
  ],
  providers: []
})
export class HeroesModule {}
