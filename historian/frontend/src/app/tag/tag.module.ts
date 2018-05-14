import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagService } from './tag.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TagsListComponent,
  ],
  providers: [
    TagService,
  ],
})
export class TagModule { }
