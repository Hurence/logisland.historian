import { Component, Input, OnInit } from '@angular/core';

import { AbsSubscriberToSelectionOfTagWithRefresh } from '../../../core/AbsSubscriberToSelectionOfTag';
import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { ProfilService } from '../../../profil/profil.service';
import { ArrayUtil } from '../../../shared/array-util';
import { IHistorianTag } from '../../tag/modele/HistorianTag';
import { CartesianAxeType, ILineChartData, ILineChartDataset, ILineChartOption, TimeDistribution } from './LineChartModele';

export interface TimeRangeFilter {
  label: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends AbsSubscriberToSelectionOfTagWithRefresh implements OnInit {

  data: ILineChartData;
  options: ILineChartOption;
  tags: IHistorianTag[];
  timeRangeFilter: TimeRangeFilter =  {label: 'Last 15 minutes', start: 'NOW-15MINUTES', end: 'NOW'};
  @Input() refreshRate: number;

  starts: TimeRangeFilter[] = [
    {label: 'Today', start: 'NOW/DAY', end: 'NOW+1DAY/DAY'},
    // {label: 'This week', start: 'NOW/WEEK', end: 'NOW+1WEEK/WEEK'},
    {label: 'This month', start: 'NOW/MONTH', end: 'NOW+1MONTH/MONTH'},
    {label: 'This year', start: 'NOW/YEAR', end: 'NOW+1YEAR/YEAR'},
    {label: 'The day so far', start: 'NOW/DAY', end: 'NOW'},
    // {label: 'Week to date', start: 'NOW/WEEK', end: 'NOW'},
    {label: 'Month to date', start: 'NOW/MONTH', end: 'NOW'},
    {label: 'Year to date', start: 'NOW/YEAR', end: 'NOW'}, // yyyy-mm-ddThh:mm:ss.mmmZ
    {label: 'Yesterday', start: 'NOW-1DAY/DAY', end: 'NOW/DAY'},
    {label: 'Day before yesterday', start: 'NOW-2DAYS/DAY', end: 'NOW-1DAY/DAY'},
    {label: 'This day last week', start: 'NOW-7DAYS/DAY', end: 'NOW-6DAYS/DAY'},
    // {label: 'Previous week', start: 'NOW-1WEEK/WEEK', end: 'NOW/WEEK'},
    {label: 'Previous month', start: 'NOW-1MONTH/MONTH', end: 'NOW/MONTH'},
    {label: 'Previous year', start: 'NOW-1YEAR/YEAR', end: 'NOW/YEAR'},
    {label: 'Last 15 minutes', start: 'NOW-15MINUTES', end: 'NOW'},
    {label: 'Last 30 minutes', start: 'NOW-30MINUTES', end: 'NOW'},
    {label: 'Last 1 hour', start: 'NOW-1HOUR', end: 'NOW'},
    {label: 'Last 4 hours', start: 'NOW-4HOURS', end: 'NOW'},
    {label: 'Last 12 hours', start: 'NOW-12HOURS', end: 'NOW'},
    {label: 'Last 24 hours', start: 'NOW-24HOURS', end: 'NOW'},
    {label: 'Last 7 days', start: 'NOW-7DAYS', end: 'NOW'},
    {label: 'Last 30 days', start: 'NOW-30DAYS', end: 'NOW'},
    {label: 'Last 60 days', start: 'NOW-60DAYS', end: 'NOW'},
    {label: 'Last 90 days', start: 'NOW-90DAYS', end: 'NOW'},
    {label: 'Last 6 months', start: 'NOW-6MONTHS', end: 'NOW'},
    {label: 'Last 1 year', start: 'NOW-1YEAR', end: 'NOW'},
    {label: 'Last 2 years', start: 'NOW-2YEARS', end: 'NOW'},
    {label: 'Last 5 year', start: 'NOW-5YEARS', end: 'NOW'}
  ];

  constructor(private measuresService: MeasuresService,
              private arrayUtil: ArrayUtil,
              protected profilService: ProfilService) {
    super(profilService);
    this.data = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // labels: [0, 5, 10, 15, 20, 25, 30],
      datasets: []
    };
    this.options = {
      title: {
        display: true,
        text: 'Time series of tags',
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

  changeTimeRange(timeRange: TimeRangeFilter) {
    this.timeRangeFilter = timeRange;
    this.updateGraphData();
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
    return  {
      label: m.name,
      data: timeSerie,
      fill: false,
      borderColor: '#4bc0c0'
    };
  }

  private buildTagMeasureRequest(tag: IHistorianTag): MeasuresRequest {
    return new MeasuresRequest({
      itemId: tag.id,
      start: this.timeRangeFilter.start,
      end: this.timeRangeFilter.end
    });
  }
}
