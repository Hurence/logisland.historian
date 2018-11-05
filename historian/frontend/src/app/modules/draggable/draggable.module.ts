/**
 * Thanks to Dirk Luijk and his tutorial: https://www.youtube.com/watch?v=KeU83fCoW10&feature=youtu.be
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovableDirective } from './movable.directive';
import { DraggableDirective } from './draggable.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { SortableDirective } from './sortable.directive';
import { SortableListDirective } from './sortable-list.directive';
import { DroppableDirective } from './droppable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';
import { DroppableService } from './droppable.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [DraggableDirective, MovableDirective, MovableAreaDirective, SortableDirective, SortableListDirective,
    DroppableDirective, DropzoneDirective, DraggableHelperDirective],
  exports: [DraggableDirective, MovableDirective, MovableAreaDirective, SortableDirective, SortableListDirective,
    DroppableDirective, DropzoneDirective, DraggableHelperDirective],
  providers: [
    DroppableService
  ]
})
export class DraggableModule { }
