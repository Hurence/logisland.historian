import { BackendGaugeConfig, ZoneRangeConfig } from './../gauge-form/gauge-form.component';
import { DropdownQuestion } from './../../../../shared/dynamic-form/question-dropdown';
import { HistorianTag } from './../../../tag/modele/HistorianTag';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn } from '../../../../shared/refresh-rate-selection/auto-refresh-interval';
import { CookieService } from 'ngx-cookie-service';
import { IModification, Operation } from '../../../datasource/ConfigurationToApply';
import { ArrayQuestion, IArrayQuestion } from '../../../../shared/dynamic-form/question-array';
import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { NumberQuestion } from '../../../../shared/dynamic-form/question-number';
import { ZoneRange, ZoneRangeColorsUtil, ZoneRangeColors } from '../../../graph/gauge-chart/gauge';
import { TimeRangeFilter, timeRangeBuiltIn } from '../../../../shared/time-range-selection/time-range-filter';
import { MeasuresRequest } from '../../../../measure/MeasuresRequest';
import { Subscription, Observable, empty, of } from 'rxjs';
import { MeasuresService } from '../../../../measure/measures.service';
import { IAgregation } from '../../../../measure/Measures';
import { HistorianTagDropdownQuestion } from '../../../../shared/dynamic-form/question-historian-tag-dropdown';
import { TagUtils } from '../../../tag/modele/TagUtils';
import { RefreshRateComponentAsInnerVariable } from '../../../../shared/refresh-rate-selection/RefreshRateComponentAsInnerVariable';
import { ConditionalQuestion, IConditionalQuestion } from '../../../../shared/dynamic-form/question-conditional';
import { RadioQuestion } from '../../../../shared/dynamic-form/question-radio';
import { TextboxQuestion } from '../../../../shared/dynamic-form/question-textbox';
import { Dashboard, BackGauge, BackZoneRange } from '../../../dashboard/modele/Dashboard';
import { TagHistorianService } from '../../../tag/service/tag-historian.service';
import { map, tap } from 'rxjs/operators';
import { ArrayUtil } from '../../../../shared/array-util';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { stringify } from 'querystring';
import { ConfirmationService } from 'primeng/api';

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

  gaugeFormOperation: Operation = Operation.UPDATE;
  gaugeForForm: BackendGaugeConfig;
  displayGaugeForm: boolean = false;
  selectedGaugeIndex: number;

  gaugeConfigs: BackendGaugeConfig[] = [];
  numberOfGauges: number = 0;
  gaugeRawParams: GaugeRawParams[] = [];

  error: boolean = false;

  gaugeEditQuestions: QuestionBase<any>[];

  private measuresRefreshSubscription: Subscription;

  dashboard: Dashboard;

  private _dashboardId: string;
  get dashboardId(): string {
    if (this._dashboardId) return this._dashboardId;
    if (this.cookieService.check('dashboardId')) return this.cookieService.get('dashboardId');
    return null;
  }

  set dashboardId(newDashboard: string) {
    this._dashboardId = newDashboard;
    this.cookieService.set('dashboardId', this.dashboardId);
  }

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

  dashboardInitialization: Subscription;
  redrawDashBoardSubscription: Subscription;

  constructor(private measuresService: MeasuresService,
              private cookieService: CookieService,
              private tagHistorianService: TagHistorianService,
              private arrayUtil: ArrayUtil,
              private dashboardService: DashboardService,
              protected confirmationService: ConfirmationService) {
                // TODO remove cookie and include timerange/autorefresh to dashboard config (including gauges)
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.changeRefreshRate(+this.autoRefreshInterval.refrashInterval);
    this.gaugeEditQuestions = this.getQuestions();
    if (!this.dashboard && this.dashboardId) {
      if (this.dashboardInitialization && !this.dashboardInitialization.closed) {
        this.dashboardInitialization.unsubscribe();
      }
      this.dashboardInitialization = this.dashboardService.get(this.dashboardId).subscribe(ds => this.changeDashboard(ds));
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
  }

  onGaugeAdded(): void {
    this.gaugeForForm = {
      value: 50,
      label: 'new gauge',
      min: 0,
      max: 1000,
      zoneranges: [
        { from: 0, to : 175, color: ZoneRangeColors.RED },
        { from: 175, to : 250, color: ZoneRangeColors.YELLOW },
        { from: 250, to : 750, color: ZoneRangeColors.GREEN },
        { from: 750, to : 825, color: ZoneRangeColors.YELLOW },
        { from: 825, to : 1000, color: ZoneRangeColors.RED }
      ],
    };
    this.gaugeFormOperation = Operation.CREATE;
    this.displayGaugeForm = true;
  }

  private convertBackGaugeToBackendGaugeQueryingTags(gauges: BackGauge[]): Observable<BackendGaugeConfig[]> {
    const neededTagIds: string[] = Array.from(this.getNeededTagsIdForArrayForBackGauge(gauges));
    if (neededTagIds.length === 0) return of(gauges.map(g => this.convertBackGaugeToBackendGaugeKnowingTags(g, new Map())));
    return this.tagHistorianService.getAllWithIds(neededTagIds).pipe(
      map(tags => {
        const tagMap = new Map<string, HistorianTag>();
        tags.forEach(t => { tagMap.set(t.id, t); });
        return gauges.map(g => this.convertBackGaugeToBackendGaugeKnowingTags(g, tagMap));
      })
    );
  }

  private getNeededTagsIdForArrayForBackGauge(gaugesConf: BackGauge[]): Set<string> {
    return gaugesConf
      .map(conf => this.getNeededTagsIdForBackGauge(conf))
      .reduce(
        (x: Set<string>, y: Set<string>) => {
          y.forEach(s => x.add(s));
          return x;
        }, new Set<string>());
  }

  private getNeededTagsIdForBackGauge(gaugesConf: BackGauge): Set<string> {
    return this.lookForTagInBackGaugeConfig(gaugesConf, ['min', 'max', 'value', 'zoneranges']);
  }
  /**
   * Look for tag in fields
   * @param gaugeConf
   * @param fields
   */
  private lookForTagInBackGaugeConfig(gaugeConf: BackGauge, fields: (keyof typeof gaugeConf)[]): Set<string> {
    const neededTags: Set<string> = new Set();
    fields.forEach(f => {
      const value = gaugeConf[f];
      const tryNumber = +value;
      if (Number.isNaN(tryNumber) && typeof value === 'string') {
        neededTags.add(value);
      } else if (f === 'zoneranges') { // ZoneRangeConfig[]
        (value as BackZoneRange[]).forEach(z => {
          this.lookForTagInBackZoneRange(z, ['from', 'to']).forEach(tagId => neededTags.add(tagId));
        });
      }
    });
    return neededTags;
  }

  private lookForTagInBackZoneRange(gaugeConf: BackZoneRange, fields: (keyof typeof gaugeConf)[]): Set<string> {
    const neededTags: Set<string> = new Set();
    fields.forEach(f => {
      const value = gaugeConf[f];
      const tryNumber = +value;
      if (Number.isNaN(tryNumber) && typeof value === 'string') {
        neededTags.add(value);
      }
    });
    return neededTags;
  }

  private convertBackGaugeToBackendGaugeKnowingTags(g: BackGauge, tagMap: Map<string, HistorianTag>): BackendGaugeConfig {
    let zrs: ZoneRangeConfig[] = [];
    if (g.zoneranges && g.zoneranges.length !== 0) {
      zrs = g.zoneranges
        .map(z => this.getZoneRangeConfig(z, tagMap));
    }
    const bgc: BackendGaugeConfig = {
      value: this.getNumberOrTag(g, 'value', tagMap),
      label: g.name,
      min: this.getNumberOrTag(g, 'min', tagMap),
      max: this.getNumberOrTag(g, 'max', tagMap),
      zoneranges: zrs,
    };
    return bgc;
  }

  private getZoneRangeConfig(z: BackZoneRange, tagMap: Map<string, HistorianTag>): ZoneRangeConfig {
    const zoneRange: any = {};
    zoneRange.from = this.getNumberOrTag(z, 'from', tagMap);
    zoneRange.to = this.getNumberOrTag(z, 'to', tagMap);
    zoneRange.color = z.color;
    return zoneRange as ZoneRangeConfig;
  }

  private getNumberOrTag(gaugeConf: any, field: string, tagMap: Map<string, HistorianTag>): number | HistorianTag {
    const tryNumber = +gaugeConf[field];
    if (Number.isNaN(tryNumber)) {
      return tagMap.get(gaugeConf[field]);
    } else {
      return tryNumber;
    }
  }

  onDashboardChanged(dashboard: Dashboard): void {
    this.changeDashboard(dashboard);
    // if (dashboard && dashboard.name !== this.tagSelectionId) {
    //   if (this.tagSlectionIsClean) {
    //     this.changeSelection(selection);
    //   } else {
    //     this.confirmationService.confirm({
    //       message: `You did not save your modification on current tag selection. Click Ok if you do not care,
    //                 otherwise click cancel then click on update in selection menu.`,
    //       header: 'Confirmation',
    //       rejectLabel: 'Cancel',
    //       acceptLabel: 'Ok',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         this.changeSelection(selection);
    //       },
    //       reject: () => {
    //         // workaround as p-dropdown seems bugged see : https://github.com/primefaces/primeng/issues/877
    //         this.menu.setDashboardDropDownValue(this.currentTagsSelection);
    //       }
    //     });
    //   }
    // }
  }

  onDashboardUpdated(dashboard: Dashboard): void {
    // this.tagSlectionIsClean = true; TODO ?????
  }

  showEditGaugeForm(i: number): void {
    this.selectedGaugeIndex = i;
    this.gaugeForForm = this.gaugeConfigs[i];
    this.displayGaugeForm = true;
  }

  private changeDashboard(newDashboard: Dashboard): void {
    this.dashboard = newDashboard;
    this.dashboardId = newDashboard.id;
    if (this.redrawDashBoardSubscription && !this.redrawDashBoardSubscription.closed) {
      this.redrawDashBoardSubscription.unsubscribe();
    }
    this.redrawDashBoardSubscription = this.convertBackGaugeToBackendGaugeQueryingTags(newDashboard.panels).subscribe(gaugeConfs => {
      this.gaugeConfigs = gaugeConfs;
      this.updateGaugesData(gaugeConfs);
    });
    // this.gaugeConfigs = newDashboard.panels;
    // this.tagSlectionIsClean = true;
    // this.navigateLocal({
    //   tagSelectionId: newSelection.name
    // });
  }

  onDashboardSave(dashboard: Dashboard): void {
    const panels: BackGauge[] = this.gaugeConfigs.map(bg => this.convertBackendGaugeToBackGauge(bg));
    dashboard.panels = panels;
    this.dashboardService.update(dashboard, dashboard.id).subscribe();
  }

  private convertBackendGaugeToBackGauge(bgc: BackendGaugeConfig): BackGauge {
    let zr = [];
    if (bgc.zoneranges && bgc.zoneranges.length !== 0) {
      zr = bgc.zoneranges
        .map(z => this.getBackZoneRange(z));
    }
    const tagValue: string = this.getNumberOrIdTag(bgc.value) as string;
    const bg: BackGauge = {
      type: 'gauge',
      name: bgc.label,
      // from: string,
      // to: string,
      // autorefresh: this.numberOfGauges,
      value: tagValue,
      min: this.getNumberOrIdTag(bgc.min),
      max: this.getNumberOrIdTag(bgc.max),
      zoneranges: zr
    };
    return bg;
  }

  private getBackZoneRange(z: ZoneRangeConfig): BackZoneRange {
    const zr: any = {};
    zr.from = this.getNumberOrIdTag(z.from);
    zr.to = this.getNumberOrIdTag(z.to);
    zr.color = z.color;
    return zr as BackZoneRange;
  }

  private getNumberOrIdTag(numberOrTag: number | HistorianTag): number | string {
    if (TagUtils.isHistorianTag(numberOrTag)) {
      return numberOrTag.id;
    } else {
      return numberOrTag;
    }
  }
  deleteGauge(index: number): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this gauge ? (${this.gaugeRawParams[index].label})`,
      header: 'Confirmation',
      rejectLabel: 'Cancel',
      acceptLabel: 'Ok',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.arrayUtil.removeIndex(this.gaugeRawParams, index);
        this.arrayUtil.removeIndex(this.gaugeConfigs, index);
      },
      reject: () => { }
    });
  }

  onGaugeConfigChange(gaugeConfModif: IModification<BackendGaugeConfig>, index?: number): void {
    const operation = gaugeConfModif.operation;
    switch (operation) {
      case Operation.CREATE:
        this.gaugeConfigs.push(gaugeConfModif.item);
        this.getGaugeRawParamsObs(gaugeConfModif.item).subscribe(rawParam => {
          this.gaugeRawParams.push(rawParam);
          // TODO set gauge to loading ?
        });
        break;
      case Operation.UPDATE:
        this.gaugeConfigs[index] = gaugeConfModif.item;
        this.getGaugeRawParamsObs(gaugeConfModif.item).subscribe(rawParam => {
          this.gaugeRawParams[index] = rawParam;
          // TODO set gauge to loading ?
        });
        break;
    }
    this.displayGaugeForm = false;
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGaugesData(this.gaugeConfigs);
  }

  private getGaugeRawParams(gaugeConf: BackendGaugeConfig, lastTagsValue: Map<string, number>): GaugeRawParams {
    const rawParam: any = Object.assign({}, gaugeConf);
    rawParam.min = this.getRawOrTagVariable(gaugeConf, 'min', lastTagsValue);
    rawParam.max = this.getRawOrTagVariable(gaugeConf, 'max', lastTagsValue);
    rawParam.value = this.getRawOrTagVariable(gaugeConf, 'value', lastTagsValue);
    if (gaugeConf.zoneranges && gaugeConf.zoneranges.length !== 0) {
      rawParam.greenZones = gaugeConf.zoneranges
        .filter(z => z.color === ZoneRangeColors.GREEN)
        .map(z => this.getRawZone(z, lastTagsValue));
      rawParam.yellowZones = gaugeConf.zoneranges
        .filter(z => z.color === ZoneRangeColors.YELLOW)
        .map(z => this.getRawZone(z, lastTagsValue));
      rawParam.redZones = gaugeConf.zoneranges
        .filter(z => z.color === ZoneRangeColors.RED)
        .map(z => this.getRawZone(z, lastTagsValue));
    }
    return rawParam;
  }

  private getRawZone(z: ZoneRangeConfig, lastTagsValue: Map<string, number>): ZoneRange {
    const zoneRange: any = {};
    zoneRange.from = this.getRawOrTagVariable(z, 'from', lastTagsValue);
    zoneRange.to = this.getRawOrTagVariable(z, 'to', lastTagsValue);
    return zoneRange as ZoneRange;
  }

  private getRawOrTagVariable(gaugeConf: any, field: string, lastTagsValue: Map<string, number>): number {
    if (TagUtils.isHistorianTag(gaugeConf[field])) {
      const tag = gaugeConf[field] as HistorianTag;
      return lastTagsValue.get(`${tag.datasource_id}|${tag.node_id}`);
    } else {
      return gaugeConf[field];
    }
  }

  /**
   * SECTION Gauges updates
   * iterate all BackendGaugeConfig and update all GaugeParams accordingly
   */
  private updateGaugesData(gaugesConf: BackendGaugeConfig[]): void {
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
          this.gaugeRawParams = this.getGaugesRawParams(gaugesConf, lastTagsValue);
          this.error = false;
        },
        error => {
          this.error = true;
          console.log('error requesting data', error);
          // this.getGaugesRawParams(gaugesConf, new Map());
        }
      );
    } else {
      this.gaugeRawParams = this.getGaugesRawParams(gaugesConf, new Map());
      this.error = false;
    }
  }

/**
   * update specified BackendGaugeConfig and update all GaugeParams accordingly
   */
  private getGaugeRawParamsObs(gaugeConf: BackendGaugeConfig): Observable<GaugeRawParams> {
    const neededTagIds: string[] = Array.from(this.getNeededTagsIdForArray([gaugeConf]));
    const requests: MeasuresRequest[] = neededTagIds.map(tagId => {
      return this.buildTagMeasureRequest(tagId);
    });
    if (requests && requests.length !== 0) {
      return this.measuresService.getMany(requests).pipe(
        map(measures => {
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
          return this.getGaugeRawParams(gaugeConf, lastTagsValue);
        })
      );
    } else {
      return of(this.getGaugeRawParams(gaugeConf,  new Map()));
    }
  }

  private getGaugesRawParams(gaugesConf: BackendGaugeConfig[], lastTagsValue: Map<string, number>): GaugeRawParams[] {
    return gaugesConf.map(conf => this.getGaugeRawParams(conf, lastTagsValue));
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
    return this.lookForTagInBackendGaugeConfig(gaugesConf, ['min', 'max', 'value', 'zoneranges']);
  }

  /**
   * Look for tag in fields
   * @param gaugeConf
   * @param fields
   */
  private lookForTagInBackendGaugeConfig(gaugeConf: BackendGaugeConfig, fields: (keyof typeof gaugeConf)[]): Set<string> {
    const neededTags: Set<string> = new Set();
    fields.forEach(f => {
      const value = gaugeConf[f];
      if (TagUtils.isHistorianTag(value)) {
        neededTags.add(value.id);
      } else if (f === 'zoneranges') { // ZoneRangeConfig[]
        (value as ZoneRangeConfig[]).forEach(z => {
          this.lookForTagInZoneRangeConfig(z, ['from', 'to']).forEach(tagId => neededTags.add(tagId));
        });
      }
    });
    return neededTags;
  }

  private lookForTagInZoneRangeConfig(gaugeConf: ZoneRangeConfig, fields: (keyof typeof gaugeConf)[]): Set<string> {
    const neededTags: Set<string> = new Set();
    fields.forEach(f => {
      const value = gaugeConf[f];
      if (TagUtils.isHistorianTag(value)) {
        neededTags.add(value.id);
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
      label: 'Zone ranges',
      questions: [
        new ConditionalQuestion<number | HistorianTag>(this.buildNumberTagConditional('from', 'From')),
        new ConditionalQuestion<number | HistorianTag>(this.buildNumberTagConditional('to', 'To')),
        new DropdownQuestion({
          key: 'color',
          label: 'Color',
          order: 3,
          required: true,
          placeholder: 'choose a color',
          possibleValues: ZoneRangeColorsUtil.values.map(c => { return { label: c, value: c }; }),
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
        key: 'label',
        label: 'Label of gauge',
        order: 2,
        required: true,
        placeholder: 'center label for gauge',
      }),
      new ConditionalQuestion<number | HistorianTag>(this.buildNumberTagConditional('min', 'Min')),
      new ConditionalQuestion<number | HistorianTag>(this.buildNumberTagConditional('max', 'Max')),
      new ArrayQuestion<ZoneRange>(zoneQuestions)
    ];
  }

  private buildNumberTagConditional(key: string, label: string): IConditionalQuestion<number | HistorianTag> {
    return {
      key: key,
      label: label,
      order: 1,
      required: true,
      conditionsQuestion: new RadioQuestion<string>({
        key: `${key}_static_or_dynamic`,
        label: `type of ${key}`,
        required: false,
        value: 'static',
        possibleValues: ['static', 'dynamic'],
      }),
      conditionsResult: [
        {
          ifKey: 'static',
          thenQuestion: new NumberQuestion({
            key: key,
            label: label,
            labelHidden: true,
            errorHidden: true,
            required: false,
          })
        },
        {
          ifKey: 'dynamic',
          thenQuestion: new HistorianTagDropdownQuestion({
            key: key,
            label: label,
            labelHidden: true,
            errorHidden: true,
            required: false
          })
        }
      ]
    };
  }
}
