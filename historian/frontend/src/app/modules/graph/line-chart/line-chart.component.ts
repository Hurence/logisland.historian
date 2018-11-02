import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { ProfilService } from '../../../profil/profil.service';
import { ArrayUtil } from '../../../shared/array-util';
import { TimeRangeFilter, TimeRangeFilterUtils } from '../../../shared/time-range-selection/time-range-filter';
import { IHistorianTag, HistorianTag } from '../../tag/modele/HistorianTag';
import { CartesianAxeType, ILineChartData, ILineChartDataset, ILineChartOption, TimeDistribution, Point, IAxes } from './LineChartModele';
import { RefreshRateComponent } from '../../../shared/refresh-rate-selection/RefreshRateComponent';
import { tap, map } from 'rxjs/operators';
import { Observable ,  from, Subscription , merge} from 'rxjs';
import { UIChart } from 'primeng/components/chart/chart';

export interface DatasetMeta {
  color: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends RefreshRateComponent implements OnInit, OnChanges, OnDestroy {

  dataInit: ILineChartData;
  optionsInit: ILineChartOption;
  @Input() tags: IHistorianTag[];
  @Input() refreshRate: number;
  @Input() timeRange: TimeRangeFilter;
  private colors: string[] = ['#d9080d', '#6aba15', '#241692', '#e23eba',
  '#7e461f', '#7d30b2', '#f5cb82', '#fd3e6f', '#d7e206', '#b6cdce', '#4bc0c0'];

  private metaForMetrics: Map<string, DatasetMeta> = new Map();
  private measuresRefreshSubscription: Subscription;
  private dynamicallyAddTagSubscription: Subscription;
  private initScale = {
    xAxes: [
      {
        type: CartesianAxeType.TIME,
        distribution: TimeDistribution.LINEAR,
      }
    ],
    yAxes: [
      {
        id: 'left-1',
        type: CartesianAxeType.LINEAR,
        position: 'left',
        labelString: 'left axis 1',
        display: false,
        fontColor: '#666'
      },
      {
        id: 'left-2',
        type: CartesianAxeType.LINEAR,
        position: 'left',
        labelString: 'left axis 2',
        display: false,
        fontColor: '#666'
      },
      {
        id: 'right-1',
        type: CartesianAxeType.LINEAR,
        position: 'right',
        labelString: 'right axis 1',
        display: false,
        fontColor: '#666'
      },
      {
        id: 'right-2',
        type: CartesianAxeType.LINEAR,
        position: 'right',
        labelString: 'right axis 2',
        display: false,
        fontColor: '#666'
      },
    ]
  };

  @ViewChild(UIChart)
  private chartComp: UIChart;


  constructor(private measuresService: MeasuresService,
              protected profilService: ProfilService,
              private arrayUtil: ArrayUtil) {
    super();
    this.dataInit = {
      datasets: []
    };
    this.optionsInit = {
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
      scales: this.initScale,
      /*A bug occur when animation is on and we change dataset rapidly (low refreshRate)
      Another solution would be to use chart.update apparently. See https://github.com/chartjs/Chart.js/issues/5149
      */
      animation: {
          duration: 0 // general animation time
      },
      responsive: false,
      maintainAspectRatio: false,
      hover: {
          animationDuration: 0 // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0 // animation duration after a resize
    };
  }

  get chart(): any {
    return this.chartComp.chart;
  }
  get data(): ILineChartData {
    if (this.chartComp.chart) return this.chartComp.chart.data;
    return this.dataInit;
  }
  get options(): ILineChartOption {
    return this.chartComp.chart.options;
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

  selectData(event) {
    // when user click on a point
    console.log(`Data Selected' : ${this.data.datasets[event.element._datasetIndex].data[event.element._index]}`);
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGraphData();
  }

  /**
   * SECTION Graphe updates
   */
  updateGraphData() {
    console.log('UPDATE GRAPH DATA');
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
    const requests = this.tags.map(tag => {
      return this.buildTagMeasureRequest(tag);
    });
    this.measuresRefreshSubscription = this.measuresService.getMany(requests).subscribe(
      measures => {
        console.log('found measures', measures.length);
        const datasets: ILineChartDataset[] = measures.map(m => {
          return this.convertMeasureToDataset(m);
        });
        this.redrawGraph(datasets);
      },
      error => {
        console.log('error requesting data', error);
        this.redrawGraph([]);
      }
    );
  }

  redrawGraph(newDatasets: ILineChartDataset[]) {
    this.data.datasets = newDatasets;
    this.options.scales.yAxes.forEach(axe => {
      axe.display = false;
    });
    newDatasets.forEach((dataset, index) => {
      const axe: IAxes = this.findAxeToAssign(index, this.options.scales.yAxes);
      axe.display = true;
      dataset.yAxisID = axe.id;
    });
    this.chartComp.chart.update();
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
          const axe: IAxes = this.findAxeToAssign(this.data.datasets.length - 1, this.options.scales.yAxes);
          axe.display = true;
          dataset.yAxisID = axe.id;
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
    const deleted = this.arrayUtil.remove(this.data.datasets, (ds: ILineChartDataset) => ds.label === tag.node_id);
    // look if yAxes deleted still in use otherwise put display to false
    if (!this.arrayUtil.exist(this.data.datasets, ds => ds.yAxisID === deleted.yAxisID)) {
      this.chart.scales[deleted.yAxisID].options.display = false;
    }
    if (this.chartComp.chart) this.chartComp.chart.update();
  }

  private findAxeToAssign(indexDataset: number, axes: IAxes[]): IAxes {
    return axes[indexDataset % axes.length];
  }

  /**
   * MEASURE SECTION
   */
  private convertMeasureToDataset(m: Measures): ILineChartDataset {
    const timeSerie = m.timestamps.map((time, index) => {
      const value = m.values[index];
      return {
        x: time,
        y: value
      };
    });
    const meta: DatasetMeta = this.getOrCreateMeta(m.name);

    const dataset: ILineChartDataset = {
      label: m.name,
      data: timeSerie,
      cubicInterpolationMode: 'monotone',
      lineTension: 0,
      fill: false,
      borderColor: meta.color
    };
    console.log('dataset', dataset);
    return  dataset;
  }

  private getOrCreateMeta(name: string): DatasetMeta {
    if (!this.metaForMetrics.has(name)) {
      const meta: DatasetMeta = {
        color: this.getNextColorOrRandomColor()
      };
      this.metaForMetrics.set(name, meta);
      return meta;
    } else {
      return this.metaForMetrics.get(name);
    }
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

  /**
   * COLOR SECTION
   */
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
}
