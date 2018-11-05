/**
 * Thanks to Dirk Luijk and his tutorial: https://www.youtube.com/watch?v=KeU83fCoW10&feature=youtu.be
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DroppableService {
  dragStart$: Observable<PointerEvent>;
  dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor(@SkipSelf() @Optional() private parent?: DroppableService) {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: PointerEvent): void {
    this.dragStartSubject.next(event);

    if (this.parent) {
      this.parent.onDragStart(event);
    }
  }

  onDragMove(event: PointerEvent): void {
    this.dragMoveSubject.next(event);

    if (this.parent) {
      this.parent.onDragMove(event);
    }
  }

  onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next(event);

    if (this.parent) {
      this.parent.onDragEnd(event);
    }
  }
}
