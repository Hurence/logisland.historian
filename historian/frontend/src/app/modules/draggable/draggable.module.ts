import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovableDirective } from './movable.directive';
import { DraggableDirective } from './draggable.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { DroppableDirective } from './droppable.directive';
import { DropzoneDirective } from './dropzone.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, MovableDirective, MovableAreaDirective, SortableDirective, SortableListDirective, DroppableDirective, DropzoneDirective],
  exports: [DraggableDirective, MovableDirective, MovableAreaDirective, SortableDirective, SortableListDirective, DroppableDirective, DropzoneDirective]
})
export class DraggableModule { }
