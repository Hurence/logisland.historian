import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TagService } from './tag.service';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TagsListComponent,
  ],
  providers: [],
})
export class TagModule { }
