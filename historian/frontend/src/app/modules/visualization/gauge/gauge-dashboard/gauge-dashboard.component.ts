import { Component, OnInit } from '@angular/core';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../../../shared/refresh-rate-selection/auto-refresh-interval';
import { CookieService } from 'ngx-cookie-service';
import { TextboxQuestion } from '../../../../shared/dynamic-form/question-textbox';
import { BackendGaugeConfig } from '../gauge-form/gauge-form.component';
import { IModification } from '../../../datasource/ConfigurationToApply';
import { ArrayQuestion, IArrayQuestion } from '../../../../shared/dynamic-form/question-array';
import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { NumberQuestion } from '../../../../shared/dynamic-form/question-number';
import { ZoneRange } from '../../../graph/gauge-chart/gauge';


@Component({
  selector: 'app-gauge-dashboard',
  templateUrl: './gauge-dashboard.component.html',
  styleUrls: ['./gauge-dashboard.component.css']
})
export class GaugeDashboardComponent implements OnInit {

  gaugeConfig: BackendGaugeConfig = {
    value: 500,
    min : 150,
    max : 1000,
    greenZones : [
       { from: 200, to : 500 }
    ],
    yellowZones : [
       { from: 175, to : 200 },
       { from: 500, to : 600 }
    ],
    redZones : [
       { from: 150, to : 175 },
       { from: 600, to : 1000 }
    ]
  };

  label = 'ma jauge';

  gaugeEditQuestions: QuestionBase<any>[];

  private _autoRefreshInterval: AutoRefreshInterval;
  get autoRefreshInterval(): AutoRefreshInterval {
    if (this._autoRefreshInterval) return this._autoRefreshInterval;
    if (this.cookieService.check('autoRefreshInterval')) return JSON.parse(this.cookieService.get('autoRefreshInterval'));
    return autoRefreshIntervalBuiltIn.TEN_SECONDS;
  }

  set autoRefreshInterval(newAutoRefreshInterval: AutoRefreshInterval) {
    this._autoRefreshInterval = newAutoRefreshInterval;
    this.cookieService.set('autoRefreshInterval', JSON.stringify(this._autoRefreshInterval));
  }

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.gaugeEditQuestions = this.getQuestions();
  }

  onGaugeConfigChange(gaugeConfModif: IModification<BackendGaugeConfig>): void {
    const gaugeConf = gaugeConfModif.item;
    const min: number = +gaugeConf.min;
    const max: number = +gaugeConf.max;
    const value: number = +gaugeConf.value;    
    // TODO handle if value are tag instead of number
    if (min === NaN) {
      console.log('min is a string');
    } else {
      this.gaugeConfig.min = min;
    }
    if (max === NaN) {
      console.log('max is a string');
    } else {
      this.gaugeConfig.max = max;
    }
    if (value === NaN) {
      console.log('value is a string');
    } else {
      this.gaugeConfig.value = value;
    }
    if (gaugeConf.greenZones) {
      this.gaugeConfig.greenZones = gaugeConf.greenZones;
    }
    if (gaugeConf.yellowZones) {
      this.gaugeConfig.yellowZones = gaugeConf.yellowZones;
    }
    if (gaugeConf.redZones) {
      this.gaugeConfig.redZones = gaugeConf.redZones;
    }
  }


  private getQuestions(): QuestionBase<any>[] {
    const zoneQuestions: IArrayQuestion<ZoneRange> = {
      key: 'zoneranges',
      questions: [
        new NumberQuestion({
          key: 'from',
          label: 'From',
          order: 1,
          required: true
        }),
        new NumberQuestion({
          key: 'to',
          label: 'To',
          order: 2,
          required: true,
        }),
        new TextboxQuestion({
          key: 'color',
          label: 'Color',
          order: 3,
          required: true,
        })
      ]
    };

    return [
      new TextboxQuestion({
        key: 'value',
        label: 'Monitored tag',
        order: 1,
        required: true
      }),
      new TextboxQuestion({
        key: 'min',
        label: 'Min',
        order: 1,
        required: true
      }),
      new TextboxQuestion({
        key: 'max',
        label: 'max',
        order: 2,
        required: true,
      }),
      new ArrayQuestion<ZoneRange>(zoneQuestions)
    ];
  }
}
