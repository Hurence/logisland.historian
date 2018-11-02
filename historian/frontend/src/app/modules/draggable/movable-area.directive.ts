import { Directive, AfterContentInit, ContentChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { Subscription } from 'rxjs';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]'
})
export class MovableAreaDirective implements AfterContentInit, OnDestroy {

  @ContentChildren(MovableDirective) movables: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  private subscriptions: Subscription[] = [];

  constructor(private element: ElementRef) { }

  ngAfterContentInit(): void {
    this.movables.changes.subscribe(() => {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.movables.forEach(movable => {
        this.subscriptions.push(movable.dragStart.subscribe(() => this.measureBoundaries(movable)));
        this.subscriptions.push(movable.dragMove.subscribe(() => this.maintainBoundaries(movable)));
      });
    });
    this.movables.notifyOnChanges();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  private measureBoundaries(movable: MovableDirective): void {
    const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
    const movableRect: ClientRect = movable.getBoundingClientRect();
    this.boundaries = {
      minX: viewRect.left - movableRect.left + movable.position.x,
      maxX: viewRect.right - movableRect.right + movable.position.x,
      minY: viewRect.top - movableRect.top + movable.position.y,
      maxY: viewRect.bottom - movableRect.bottom + movable.position.y
    };
  }

  private maintainBoundaries(movable: MovableDirective): void {
    movable.position.x = Math.min(this.boundaries.maxX, movable.position.x);
    movable.position.x = Math.max(this.boundaries.minX, movable.position.x);
    movable.position.y = Math.min(this.boundaries.maxY, movable.position.y);
    movable.position.y = Math.max(this.boundaries.minY, movable.position.y);
  }
}
