import { Component, OnInit } from '@angular/core';
import { ILineChartData, ILineChartOption, CartesianAxeType, TimeDistribution } from './LineChartModele';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  data: ILineChartData;
  options: ILineChartOption;

  constructor() {
    this.data = {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // labels: [0, 5, 10, 15, 20, 25, 30],
      datasets: [
        {
          label: 'First Dataset',
          data: [{
            x: 0,
            y: 65
          }, {
            x: 2,
            y: 59
          }, {
            x: 4,
            y: 80
          }, {
            x: 6,
            y: 81
          }, {
            x: 7,
            y: 56
          }, {
            x: 10,
            y: 55
          }, {
            x: 15,
            y: 40
          }],
          fill: true,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656',
        }
      ]
    };
    this.options = {
      title: {
        display: true,
        text: 'My Title',
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
  }

  update() {
    this.data = Object.assign({}, this.data);
  }

  selectData(event) {
    console.log(`Data Selected' : ${this.data.datasets[event.element._datasetIndex].data[event.element._index]}`);
  }

}
