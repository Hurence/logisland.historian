import { Component, OnInit } from '@angular/core';
import { ILineChartData, ILineChartOption, CartesianAxeType, TimeDistribution, ILineChartDataset } from './LineChartModele';
import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { AbsSubscriberToSelectionOfTag } from '../../../core/AbsSubscriberToSelectionOfTag';
import { ProfilService } from '../../../profil/profil.service';
import { IHistorianTag } from '../../tag/modele/HistorianTag';
import { ArrayUtil } from '../../../shared/array-util';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends AbsSubscriberToSelectionOfTag implements OnInit {

  data: ILineChartData;
  options: ILineChartOption;
  tags: IHistorianTag[];

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
          type: CartesianAxeType.LINEAR,
          distribution: TimeDistribution.SERIES,
          ticks: {
            // suggestedMin: 0,
            // suggestedMax: 30
          }
      }],
        yAxes: [{
            // stacked: false
            type: CartesianAxeType.LINEAR,
            ticks: {
              suggestedMin: 30,
              suggestedMax: 80
            }
        }]
      }
    };
  }

  ngOnInit() {
    this.changeSelectionSubscription = this.profilService.getSelectionPublisher().subscribe(newSelection => {
      this.tags = newSelection.tags;
      this.tags.forEach(tag => {
        const request = this.buildTagMeasureRequest(tag);
        this.measuresService.get(request).subscribe(m => {
          this.data.datasets.push(this.convertMeasureToDataset(m));
          this.update();
        });
      });
    });
    this.addTagSubscription = this.profilService.getAddTagPublisher().subscribe(tag => {
      this.tags.push(tag);
      const request = this.buildTagMeasureRequest(tag);
      this.measuresService.get(request).subscribe(m => {
        this.data.datasets.push(this.convertMeasureToDataset(m));
        this.update();
      });
    });
    this.removeTagSubscription = this.profilService.getRemoveTagPublisher().subscribe(tag => {
      this.arrayUtil.remove(this.tags, elem => tag.id === elem.id);
      this.arrayUtil.remove(this.data.datasets, dataset => tag.id === dataset.label);
      this.update();
    });
  }

  update() {
    this.data = Object.assign({}, this.data);
  }

  selectData(event) {
    console.log(`Data Selected' : ${this.data.datasets[event.element._datasetIndex].data[event.element._index]}`);
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
      start: '1474399200000',
      end: '1474499500000'
    });
  }
}
