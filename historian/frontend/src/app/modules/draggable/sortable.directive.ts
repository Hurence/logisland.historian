/**
 * Thanks to Dirk Luijk and his tutorial: https://www.youtube.com/watch?v=KeU83fCoW10&feature=youtu.be
 */
import { Directive, forwardRef, HostBinding, ElementRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appSortable]',
  providers: [
    { provide: DraggableDirective, useExisting: forwardRef(() => SortableDirective) }
  ]
})
export class SortableDirective extends DraggableDirective {
  @HostBinding('class.sortable') sortable = true;

  constructor(protected element: ElementRef) {
    super(element);
  }
}
