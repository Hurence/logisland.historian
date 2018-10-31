import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output, SkipSelf } from '@angular/core';
import { DroppableService } from './droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {
  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<PointerEvent>();
  @Output() remove = new EventEmitter<PointerEvent>();

  private clientRect: ClientRect;

  constructor(@SkipSelf() private allDroppableService: DroppableService,
              private innerDroppableService: DroppableService,
              private element: ElementRef) { }

  ngOnInit(): void {
    this.allDroppableService.dragStart$.subscribe(() => this.onDragStart());
    this.allDroppableService.dragEnd$.subscribe(event => this.onDragEnd(event));

    this.allDroppableService.dragMove$.subscribe(event => {
      if (this.isEventInside(event)) {
        this.onPointerEnter();
      } else {
        this.onPointerLeave();
      }
    });

    this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart());
    this.innerDroppableService.dragEnd$.subscribe(event => this.onInnerDragEnd(event));
  }

  private onPointerEnter(): void {
    if (!this.activated) {
      return;
    }

    this.entered = true;
  }

  private onPointerLeave(): void {
    if (!this.activated) {
      return;
    }

    this.entered = false;
  }

  private onDragStart(): void {
    this.clientRect = this.element.nativeElement.getBoundingClientRect();

    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    if (!this.activated) {
      return;
    }

    if (this.entered) {
      this.drop.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private onInnerDragStart() {
    this.activated = true;
    this.entered = true;
  }

  private onInnerDragEnd(event: PointerEvent) {
    if (!this.entered) {
      this.remove.emit(event);
    }

    this.activated = false;
    this.entered = false;
  }

  private isEventInside(event: PointerEvent) {
    return event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientY <= this.clientRect.bottom;
  }
}
