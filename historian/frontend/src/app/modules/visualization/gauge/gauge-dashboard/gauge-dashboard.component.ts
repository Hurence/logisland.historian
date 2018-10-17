import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../../../shared/refresh-rate-selection/auto-refresh-interval';
import { CookieService } from 'ngx-cookie-service';
import { TextboxQuestion } from '../../../../shared/dynamic-form/question-textbox';
import { BackendGaugeConfig } from '../gauge-form/gauge-form.component';
import { IModification } from '../../../datasource/ConfigurationToApply';
import { ArrayQuestion, IArrayQuestion } from '../../../../shared/dynamic-form/question-array';
import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { NumberQuestion } from '../../../../shared/dynamic-form/question-number';
import { ZoneRange } from '../../../graph/gauge-chart/gauge';
import { TimeRangeFilter, timeRangeBuiltIn } from '../../../../shared/time-range-selection/time-range-filter';
import { MeasuresRequest } from '../../../../measure/MeasuresRequest';
import { IHistorianTag, HistorianTag } from '../../../tag/modele/HistorianTag';
import { RefreshRateComponent } from '../../../../shared/refresh-rate-selection/RefreshRateComponent';
import { Subscription } from 'rxjs';
import { MeasuresService } from '../../../../measure/measures.service';
import { IAgregation } from '../../../../measure/Measures';
import { HistorianTagDropdownQuestion } from '../../../../shared/dynamic-form/question-historian-tag-dropdown';
import { TagUtils } from '../../../tag/modele/TagUtils';
import { RefreshRateComponentAsInnerVariable } from '../../../../shared/refresh-rate-selection/RefreshRateComponentAsInnerVariable';

export interface GaugeRawParams {
  value: number;
  min: number;
  max: number;
  label: string;
  greenZones: ZoneRange[];
  yellowZones: ZoneRange[];
  redZones: ZoneRange[];
}

@Component({
  selector: 'app-gauge-dashboard',
  templateUrl: './gauge-dashboard.component.html',
  styleUrls: ['./gauge-dashboard.component.css']
})
export class GaugeDashboardComponent extends RefreshRateComponentAsInnerVariable implements OnInit, OnDestroy {

  gaugeConfigs: BackendGaugeConfig[] = [
    {
      value: 500,
      min: 0,
      max: 1000,
      greenZones : [
         { from: 250, to : 750 }
      ],
      yellowZones : [
         { from: 175, to : 250 },
         { from: 750, to : 825 }
      ],
      redZones : [
         { from: 0, to : 175 },
         { from: 825, to : 1000 }
      ]
    }
  ];
  numberOfGauges: number = 0;
  gaugeRawParams: GaugeRawParams[] = [
    {
      value: 500,
      min: 0,
      max: 1000,
      label: 'defaut gauge',
      greenZones : [
         { from: 250, to : 750 }
      ],
      yellowZones : [
         { from: 175, to : 250 },
         { from: 750, to : 825 }
      ],
      redZones : [
         { from: 0, to : 175 },
         { from: 825, to : 1000 }
      ]
    }
  ];

  label = 'ma jauge';

  gaugeEditQuestions: QuestionBase<any>[];

  private measuresRefreshSubscription: Subscription;

  private _autoRefreshInterval: AutoRefreshInterval;
  get autoRefreshInterval(): AutoRefreshInterval {
    if (this._autoRefreshInterval) return this._autoRefreshInterval;
    if (this.cookieService.check('autoRefreshInterval')) return JSON.parse(this.cookieService.get('autoRefreshInterval'));
    return autoRefreshIntervalBuiltIn.TEN_SECONDS;
  }

  set autoRefreshInterval(newAutoRefreshInterval: AutoRefreshInterval) {
    this._autoRefreshInterval = newAutoRefreshInterval;
    this.cookieService.set('autoRefreshInterval', JSON.stringify(this._autoRefreshInterval));
    this.changeRefreshRate(+newAutoRefreshInterval.refrashInterval);
  }

  private _timeRange: TimeRangeFilter;
  get timeRange(): TimeRangeFilter {
    if (this._timeRange) return this._timeRange;
    if (this.cookieService.check('timeRange')) return JSON.parse(this.cookieService.get('timeRange'));
    return timeRangeBuiltIn.LAST_15_MINUTES;
  }

  set timeRange(newTimeRange: TimeRangeFilter) {
    this._timeRange = newTimeRange;
    this.cookieService.set('timeRange', JSON.stringify(this._timeRange));
  }

  constructor(private measuresService: MeasuresService,
              private cookieService: CookieService) {
                // TODO remove cookie and include timerange/autorefresh to dashboard config (including gauges)
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.changeRefreshRate(+this.autoRefreshInterval.refrashInterval);
    this.gaugeEditQuestions = this.getQuestions();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
  }

  onGaugeConfigChange(gaugeConfModif: IModification<BackendGaugeConfig>): void {
    this.gaugeConfigs[0] = gaugeConfModif.item;
    this.updateGaugesData(this.gaugeConfigs);
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGaugesData(this.gaugeConfigs);
  }

  private getGaugeRawParams(gaugeConf: BackendGaugeConfig, lastTagsValue: Map<string, number>): GaugeRawParams {
    const rawParam: any = {};
    rawParam.min = this.getRawOrTagVariable(gaugeConf, 'min', lastTagsValue);
    rawParam.max = this.getRawOrTagVariable(gaugeConf, 'max', lastTagsValue);
    rawParam.value = this.getRawOrTagVariable(gaugeConf, 'value', lastTagsValue);
    if (gaugeConf.greenZones) {
      rawParam.greenZones = gaugeConf.greenZones;
    }
    if (gaugeConf.yellowZones) {
      rawParam.yellowZones = gaugeConf.yellowZones;
    }
    if (gaugeConf.redZones) {
      rawParam.redZones = gaugeConf.redZones;
    }
    return rawParam;
  }

  private getRawOrTagVariable(gaugeConf: BackendGaugeConfig, field: string, lastTagsValue: Map<string, number>): number {
    if (TagUtils.isHistorianTag(gaugeConf[field])) {
      console.log('value is a tag');
      const tag = gaugeConf.value as HistorianTag;
      return lastTagsValue.get(`${tag.datasource_id}|${tag.node_id}`);
    } else {
      return gaugeConf[field];
    }
  }

  /**
   * SECTION Gauges updates
   * iterate all BackendGaugeConfig and update all GaugeParams accordingly
   */
  private updateGaugesData(gaugesConf: BackendGaugeConfig[]) {
    console.log('UPDATE GRAPH DATA');
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
    const neededTagIds: string[] = Array.from(this.getNeededTagsIdForArray(gaugesConf));
    const requests: MeasuresRequest[] = neededTagIds.map(tagId => {
      return this.buildTagMeasureRequest(tagId);
    });
    if (requests && requests.length !== 0) {
      this.measuresRefreshSubscription = this.measuresService.getMany(requests).subscribe(
        measures => {
          console.log('found measures', measures.length);
          const lastTagsValue: Map<string, number> = new Map<string, number>();
          measures.forEach(m => {
            const aggLast: IAgregation = m.functions.find(f => f.name === 'last');
            if (!aggLast) {
              console.error('no last found !');
            } else {
              lastTagsValue.set(`${m.datasource_id}|${m.tag_id}` , aggLast.value);
            }
          });
          this.redrawGauges(gaugesConf, lastTagsValue);
        },
        error => {
          console.log('error requesting data', error);
          // this.redrawGauges(gaugesConf, new Map());
        }
      );
    } else {
      this.redrawGauges(gaugesConf, new Map());
    }
  }

  private redrawGauges(gaugesConf: BackendGaugeConfig[], lastTagsValue: Map<string, number>): void {
    this.gaugeRawParams = gaugesConf.map(conf => this.getGaugeRawParams(conf, lastTagsValue));
  }

  private getNeededTagsIdForArray(gaugesConf: BackendGaugeConfig[]): Set<string> {
    return gaugesConf
      .map(conf => this.getNeededTagsId(conf))
      .reduce(
        (x: Set<string>, y: Set<string>) => {
          y.forEach(s => x.add(s));
          return x;
        }, new Set<string>());
  }

  private getNeededTagsId(gaugesConf: BackendGaugeConfig): Set<string> {
    return this.lookForTag(gaugesConf, ['min', 'max', 'value']);
  }

  private lookForTag(gaugeConf: BackendGaugeConfig, fields: string[]): Set<string> {
    const neededTags: Set<string> = new Set();
    fields.forEach(f => {
      if (TagUtils.isHistorianTag(gaugeConf[f])) {
        neededTags.add(gaugeConf[f].id);
      }
    });
    return neededTags;
  }

  private buildTagMeasureRequest(tagId: string): MeasuresRequest {
    return new MeasuresRequest({
      itemId: tagId,
      start: this.timeRange.start,
      end: this.timeRange.end,
      functions: 'last',
      no_values: true
    });
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
      new HistorianTagDropdownQuestion({
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
