import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartViewComponent } from './line-chart-view.component';

describe('LineChartViewComponent', () => {
  let component: LineChartViewComponent;
  let fixture: ComponentFixture<LineChartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
