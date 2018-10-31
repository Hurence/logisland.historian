import { Directive, Output, EventEmitter, HostListener, HostBinding, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, takeUntil, repeat, take } from "rxjs/operators";

@Directive({
  selector: '[appDraggable],[appDroppable]'
})
export class DraggableDirective implements OnInit, OnDestroy {

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  pointerId?: number;
  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();  

  constructor(protected element: ElementRef) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.pointerDown.next(event);    
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    this.pointerMove.next(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    this.pointerUp.next(event);
  }

  ngOnInit(): void {
    this.pointerDown.asObservable()
      .subscribe(event => {
        // ignore right-click
        if (event.button !== 0) {
          return;
        }
        this.pointerId = event.pointerId;        
        this.dragStart.emit(event);
      });

    this.pointerDown.pipe(
      switchMap(() => this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    ).subscribe(event => { 
      if (event.pointerId !== this.pointerId) {
        return;
      }
      this.dragMove.emit(event)
    });

    this.pointerDown.pipe(
      switchMap(() => this.pointerUp),
      take(1),
      repeat()
    ).subscribe(event => { 
      if (event.pointerId !== this.pointerId) {
        return;
      }   
      this.dragEnd.emit(event)
    });
  }

  ngOnDestroy(): void {
    if (this.pointerDown && !this.pointerDown.closed) {
      this.pointerDown.unsubscribe();
    }
    if (this.pointerMove && !this.pointerMove.closed) {
      this.pointerMove.unsubscribe();
    }
    if (this.pointerUp && !this.pointerUp.closed) {
      this.pointerUp.unsubscribe();
    }
  }

  getBoundingClientRect(): ClientRect {
    return this.element.nativeElement.getBoundingClientRect();
  }
}
