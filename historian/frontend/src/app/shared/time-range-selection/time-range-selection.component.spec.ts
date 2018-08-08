import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeSelectionComponent } from './time-range-selection.component';

describe('TimeRangeSelectionComponent', () => {
  let component: TimeRangeSelectionComponent;
  let fixture: ComponentFixture<TimeRangeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
