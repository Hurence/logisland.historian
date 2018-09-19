import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';

import { AbsSubscriberToSelectionOfTagWithRefresh } from '../../../core/AbsSubscriberToSelectionOfTag';
import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { ProfilService } from '../../../profil/profil.service';
import { ArrayUtil } from '../../../shared/array-util';
import { TimeRangeFilter, TimeRangeFilterUtils } from '../../../shared/time-range-selection/time-range-filter';
import { IHistorianTag, HistorianTag } from '../../tag/modele/HistorianTag';
import { CartesianAxeType, ILineChartData, ILineChartDataset, ILineChartOption, TimeDistribution } from './LineChartModele';
import { RefreshRateComponent } from '../../../shared/refresh-rate-selection/RefreshRateComponent';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { from, Subscription } from 'rxjs';
import {merge} from 'rxjs';
import { UIChart } from 'primeng/components/chart/chart';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends RefreshRateComponent implements OnInit, OnChanges, OnDestroy {

  data: ILineChartData;
  options: ILineChartOption;
  @Input() tags: IHistorianTag[];
  @Input() refreshRate: number;
  @Input() timeRange: TimeRangeFilter;
  private colorsForMetrics: Map<string, string> = new Map();
  private colors: string[] = ['#d9080d', '#6aba15', '#241692', '#e23eba',
  '#7e461f', '#7d30b2', '#f5cb82', '#fd3e6f', '#d7e206', '#b6cdce', '#4bc0c0'];
  private measuresRefreshSubscription: Subscription;
  private dynamicallyAddTagSubscription: Subscription;


  @ViewChild(UIChart)
  private chartComp: UIChart;


  constructor(private measuresService: MeasuresService,
              protected profilService: ProfilService,
              private arrayUtil: ArrayUtil) {
    super();
    this.data = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // labels: [0, 5, 10, 15, 20, 25, 30],
      datasets: []
    };
    this.options = {
      title: {
        display: false,
        text: 'Line Chart Graph',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      },
      showLines: true,
      spanGaps: false,
      scales: {
        xAxes: [{
          type: CartesianAxeType.TIME,
          distribution: TimeDistribution.LINEAR,
          // ticks: {
            // suggestedMin: 0,
            // suggestedMax: 30
          // }
      }],
        yAxes: [{
            // stacked: false
            type: CartesianAxeType.LINEAR,
            ticks: {
              // suggestedMin: 30,
              // suggestedMax: 80
            }
        }]
      },
      /*A bug occur when animation is on and we change dataset rapidly (low refreshRate)
      Another solution would be to use chart.update apparently. See https://github.com/chartjs/Chart.js/issues/5149
      */
      animation: {
          duration: 0
      },
      // IF YOU GOT error transition null this may help
      // hover: {
      //     animationDuration: 0
      // },
      // responsiveAnimationDuration: 0
    };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (
      (changes.timeRange && !TimeRangeFilterUtils.equals(changes.timeRange.currentValue , changes.timeRange.previousValue)) ||
      (changes.tags && changes.tags.currentValue !== changes.tags.previousValue)
    ) {
      this.updateGraphData();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
    if (this.dynamicallyAddTagSubscription && !this.dynamicallyAddTagSubscription.closed) {
      this.dynamicallyAddTagSubscription.unsubscribe();
    }
  }

  updateGraphData() {
    console.log('UPDATE GRAPH DATA');
    this.data.datasets = [];
    const newDatasets: ILineChartDataset[] = [];
    const measures: Observable<ILineChartDataset>[] = this.tags.map(tag => {
      const request = this.buildTagMeasureRequest(tag);
      return this.measuresService.get(request).pipe(
          map(m => {
            return this.convertMeasureToDataset(m);
          })
      );
    });
    const firstMeasures: Observable<ILineChartDataset> = measures.shift();
    if (firstMeasures) {
      if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
        this.measuresRefreshSubscription.unsubscribe();
      }
      this.measuresRefreshSubscription = measures.reduce(
        (r, v) => {
          return merge(r, v);
        },
        firstMeasures
      ).subscribe(
        dataset => {
          if (dataset) newDatasets.push(dataset);
        },
        error => {},
        () => {
          console.log('complete updateGraphData', newDatasets);
          this.redrawGraph(newDatasets);
        }
      );
    }
  }

  redrawGraph(newDatasets: ILineChartDataset[]) {
    this.data.datasets = newDatasets;
    this.chartComp.chart.update();
  }

  selectData(event) {
    // when user click on a point
    console.log(`Data Selected' : ${this.data.datasets[event.element._datasetIndex].data[event.element._index]}`);
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGraphData();
  }

  // Add tag to graph until next refresh
  dynamicallyAddTag(tag: HistorianTag): void {
    const request = this.buildTagMeasureRequest(tag);
    this.dynamicallyAddTagSubscription = this.measuresService.get(request).pipe(
        map(m => {
          return this.convertMeasureToDataset(m);
        })
    ).subscribe(
      dataset => {
        if (dataset) {
          this.data.datasets.push(dataset);
          this.chartComp.chart.update();
        }
      },
      error => {},
      () => {
        console.log('dynamically added tag', tag);
      }
    );
  }

  // Remove tag from graph until next refresh
  dynamicallyRemoveTag(tag: HistorianTag): void {
    this.arrayUtil.remove(this.data.datasets, (ds: ILineChartDataset) => ds.label === tag.node_id);
    if (this.chartComp.chart) this.chartComp.chart.update();
  }

  private convertMeasureToDataset(m: Measures): ILineChartDataset {
    const timeSerie = m.timestamps.map((time, index) => {
      return {
        x: time,
        y: m.values[index]
      };
    });
    if (!this.colorsForMetrics.has(m.name)) {
      this.colorsForMetrics.set(m.name, this.getNextColorOrRandomColor());
    }
    return  {
      label: m.name,
      data: timeSerie,
      cubicInterpolationMode: 'monotone',
      lineTension: 0,
      fill: false,
      borderColor: this.colorsForMetrics.get(m.name)
    };
  }
  private getNextColorOrRandomColor(): string {
    const color = this.colors.pop();
    if (color) return color;
    return this.getRandomColor();
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private buildTagMeasureRequest(tag: IHistorianTag): MeasuresRequest {
    return new MeasuresRequest({
      itemId: tag.id,
      label: tag.node_id,
      start: this.timeRange.start,
      end: this.timeRange.end,
      functions: 'savgbckt:300'
    });
  }
}
