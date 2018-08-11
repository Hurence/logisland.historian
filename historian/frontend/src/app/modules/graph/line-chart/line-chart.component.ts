import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { AbsSubscriberToSelectionOfTagWithRefresh } from '../../../core/AbsSubscriberToSelectionOfTag';
import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { ProfilService } from '../../../profil/profil.service';
import { ArrayUtil } from '../../../shared/array-util';
import { TimeRangeFilter } from '../../../shared/time-range-selection/time-range-filter';
import { IHistorianTag } from '../../tag/modele/HistorianTag';
import { CartesianAxeType, ILineChartData, ILineChartDataset, ILineChartOption, TimeDistribution } from './LineChartModele';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends AbsSubscriberToSelectionOfTagWithRefresh implements OnInit, OnChanges {

  data: ILineChartData;
  options: ILineChartOption;
  tags: IHistorianTag[];
  @Input() refreshRate: number;
  @Input() timeRange: TimeRangeFilter;
  private colorsForMetrics: Map<string, string> = new Map();
  private colors: string[] = ['#d9080d','#6aba15','#241692','#e23eba',
  '#7e461f','#7d30b2','#f5cb82','#fd3e6f','#d7e206','#b6cdce','#4bc0c0'];


  constructor(private measuresService: MeasuresService,
              private arrayUtil: ArrayUtil,
              protected profilService: ProfilService) {
    super(profilService);
    this.tags = [];
    this.data = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // labels: [0, 5, 10, 15, 20, 25, 30],
      datasets: []
    };
    this.options = {
      title: {
        display: true,
        text: 'Line Chart Graph',
        fontSize: 32
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
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.changeSelectionSubscription = this.profilService.getSelectionPublisher().subscribe(newSelection => {
      this.tags = newSelection.tags;
      this.tags.forEach(tag => {
        const request = this.buildTagMeasureRequest(tag);
        this.measuresService.get(request).subscribe(m => {
          this.data.datasets.push(this.convertMeasureToDataset(m));
          this.redrawGraph();
        });
      });
    });
    this.addTagSubscription = this.profilService.getAddTagPublisher().subscribe(tag => {
      this.tags.push(tag);
      const request = this.buildTagMeasureRequest(tag);
      this.measuresService.get(request).subscribe(m => {
        this.data.datasets.push(this.convertMeasureToDataset(m));
        this.redrawGraph();
      });
    });
    this.removeTagSubscription = this.profilService.getRemoveTagPublisher().subscribe(tag => {
      this.arrayUtil.remove(this.tags, elem => tag.id === elem.id);
      this.arrayUtil.remove(this.data.datasets, dataset => tag.id === dataset.label);
      this.redrawGraph();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes.timeRange) {
      if (changes.timeRange.currentValue !== changes.timeRange.previousValue) {
        this.updateGraphData();
      }
    }
  }

  updateGraphData() {
    this.data.datasets = [];
    this.tags.forEach(tag => {
      const request = this.buildTagMeasureRequest(tag);
      this.measuresService.get(request).subscribe(m => {
        this.data.datasets.push(this.convertMeasureToDataset(m));
        this.redrawGraph();
      });
    });
  }

  redrawGraph() {
    this.data = Object.assign({}, this.data);
  }

  selectData(event) {
    // when user click on a point
    console.log(`Data Selected' : ${this.data.datasets[event.element._datasetIndex].data[event.element._index]}`);
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGraphData();
  }

  private convertMeasureToDataset(m: Measures): ILineChartDataset {
    const timeSerie = m.timestamps.map((time, index) => {
      return {
        x: time,
        y: m.values[index]
      };
    });
    if (!this.colorsForMetrics.has(m.name)) {
      this.colorsForMetrics.set(m.name, this.getRandomColor())
    }
    return  {
      label: m.name,
      data: timeSerie,
      fill: false,
      borderColor: this.colorsForMetrics.get(m.name)
    };
  }
  private getRandomColor(): string {
    return this.colors[Math.floor(Math.random()*this.colors.length)];
  }

  private buildTagMeasureRequest(tag: IHistorianTag): MeasuresRequest {
    return new MeasuresRequest({
      itemId: tag.id,
      start: this.timeRange.start,
      end: this.timeRange.end
    });
  }
}
