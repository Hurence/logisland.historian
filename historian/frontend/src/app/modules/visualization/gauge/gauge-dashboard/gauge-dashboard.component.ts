import { DropdownQuestion } from './../../../../shared/dynamic-form/question-dropdown';
import { HistorianTag } from './../../../tag/modele/HistorianTag';
import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { AutoRefreshInterval, autoRefreshIntervalBuiltIn, AutoRefreshIntervalUtils }
  from '../../../../shared/refresh-rate-selection/auto-refresh-interval';
import { CookieService } from 'ngx-cookie-service';
import { IModification, Operation } from '../../../datasource/ConfigurationToApply';
import { ArrayQuestion, IArrayQuestion } from '../../../../shared/dynamic-form/question-array';
import { QuestionBase } from '../../../../shared/dynamic-form/question-base';
import { NumberQuestion } from '../../../../shared/dynamic-form/question-number';
import { ZoneRange, ZoneRangeColorsUtil, ZoneRangeColors } from '../../../graph/gauge-chart/gauge';
import { TimeRangeFilter, timeRangeBuiltIn, TimeRangeFilterUtils } from '../../../../shared/time-range-selection/time-range-filter';
import { MeasuresRequest } from '../../../../measure/MeasuresRequest';
import { Subscription, Observable } from 'rxjs';
import { MeasuresService } from '../../../../measure/measures.service';
import { IAgregation } from '../../../../measure/Measures';
import { HistorianTagDropdownQuestion } from '../../../../shared/dynamic-form/question-historian-tag-dropdown';
import { RefreshRateComponentAsInnerVariable } from '../../../../shared/refresh-rate-selection/RefreshRateComponentAsInnerVariable';
import { ConditionalQuestion, IConditionalQuestion } from '../../../../shared/dynamic-form/question-conditional';
import { RadioQuestion } from '../../../../shared/dynamic-form/question-radio';
import { TextboxQuestion } from '../../../../shared/dynamic-form/question-textbox';
import { Dashboard } from '../../../../core/modele/dashboard/Dashboard';
import { map, tap } from 'rxjs/operators';
import { ArrayUtil } from '../../../../shared/array-util';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { ConfirmationService } from 'primeng/api';
import { VisualizationMenuComponent } from '../../visualization-menu/visualization-menu.component';
import { GaugeConverter } from '../../../../core/modele/gauge/GaugeConverter';
import { BackGauge, BackendGaugeConfig, GaugeRawParams } from '../../../../core/modele/gauge/Gauge';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../shared/BaseCompoenentCanDeactivate';
import { applyMixins } from '../../../../core/mixin/MixinBase';

@Component({
  selector: 'app-gauge-dashboard',
  templateUrl: './gauge-dashboard.component.html',
  styleUrls: ['./gauge-dashboard.component.css']
})
export class GaugeDashboardComponent extends RefreshRateComponentAsInnerVariable implements OnInit, OnDestroy, ComponentCanDeactivate {

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

  @ViewChild(VisualizationMenuComponent)
  private menu: VisualizationMenuComponent;

  dashboard: Dashboard;
  dashboardIsClean: boolean = true;

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
    this.dashboardIsClean = false;
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
    this.dashboardIsClean = false;
    this.updateGaugesData(this.gaugeConfigs);
  }

  dashboardInitialization: Subscription;
  redrawDashBoardSubscription: Subscription;
  loadingDashboard: boolean = false;
  refreshingGauges: boolean = false;

  constructor(private measuresService: MeasuresService,
              private cookieService: CookieService,
              private arrayUtil: ArrayUtil,
              private dashboardService: DashboardService,
              protected confirmationService: ConfirmationService,
              protected gaugeConverter: GaugeConverter) {
                // TODO remove cookie and include timerange/autorefresh to dashboard config (including gauges)
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.changeRefreshRate(+this.autoRefreshInterval.refrashInterval);
    this.gaugeEditQuestions = this.getQuestions();
    if (!this.dashboard && this.dashboardId) {
      this.updateDashBoardScreen(this.dashboardId);
    }
  }

  private updateDashBoardScreen(dashboardId: string): void {
    this.loadingDashboard = true;
    if (this.dashboardInitialization && !this.dashboardInitialization.closed) {
      this.dashboardInitialization.unsubscribe();
    }
    this.dashboardInitialization = this.dashboardService.get(dashboardId).subscribe(ds => {
      if (this.redrawDashBoardSubscription && !this.redrawDashBoardSubscription.closed) {
        this.redrawDashBoardSubscription.unsubscribe();
      }
      this.redrawDashBoardSubscription = this.changeDashboard(ds).subscribe(datasource => {
        this.loadingDashboard = false;
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
    if (this.redrawDashBoardSubscription && !this.redrawDashBoardSubscription.closed) {
      this.redrawDashBoardSubscription.unsubscribe();
    }
    if (this.dashboardInitialization && !this.dashboardInitialization.closed) {
      this.dashboardInitialization.unsubscribe();
    }
  }

  onGaugeAdded(): void {
    this.gaugeForForm = {
      value: undefined,
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

  onDashboardChanged(dashboard: Dashboard): void {
    if (dashboard && dashboard.id !== this.dashboardId) {
      if (this.dashboardIsClean) {
        this.updateDashBoardScreen(dashboard.id);
      } else {
        this.confirmationService.confirm({
          message: `You did not save your modification on current dashboard '${this.dashboard.name}'. Click Ok if you do not care,
                    otherwise click cancel then click on save in top bar menu.`,
          header: 'Confirmation',
          rejectLabel: 'Cancel',
          acceptLabel: 'Ok',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.updateDashBoardScreen(dashboard.id);
          },
          reject: () => {
            // workaround as p-dropdown seems bugged see : https://github.com/primefaces/primeng/issues/877
            this.menu.setDashboardDropDownValue(this.dashboard);
          }
        });
      }
    }
  }

  canDeactivate(currentRoute?: ActivatedRouteSnapshot,
    currentState?: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      return this.dashboardIsClean;
  }

  /**
   * Called on dashboard name or description has been modified.
   * @param dashboard dashboard updated
   */
  onDashboardUpdated(dashboard: Dashboard): void {
    this.dashboard.name = dashboard.name;
    this.dashboard.description = dashboard.description;
  }

  showEditGaugeForm(i: number): void {
    this.selectedGaugeIndex = i;
    this.gaugeForForm = this.gaugeConfigs[i];
    this.displayGaugeForm = true;
  }

  private changeDashboard(newDashboard: Dashboard): Observable<Dashboard> {
    return this.gaugeConverter.convertBackGaugeToBackendGaugeQueryingTags(newDashboard.panels)
      .pipe(
        tap(gaugeConfs => {
          this.dashboard = newDashboard;
          this.dashboardId = newDashboard.id;
          this.gaugeConfigs = gaugeConfs;
          this.updateGaugesData(gaugeConfs);
          this.timeRange = TimeRangeFilterUtils.createOrGetTimeRangeFilter(newDashboard.from, newDashboard.to);
          this.autoRefreshInterval = AutoRefreshIntervalUtils.getAutoRefreshInterval(newDashboard.autorefresh.toString());
          this.dashboardIsClean = true;
        }),
        map(gaugeConfs => newDashboard)
      );
  }

  /**
   * Save dashboard because user has clicked on saving dashboard
   * @param dashboard
   */
  onDashboardSave(dashboard: Dashboard): void {
    const panels: BackGauge[] = this.gaugeConfigs.map(bg => this.gaugeConverter.convertBackendGaugeToBackGauge(bg));
    dashboard.panels = panels;
    dashboard.from = this.timeRange.start;
    dashboard.to = this.timeRange.end;
    dashboard.autorefresh = +this.autoRefreshInterval.refrashInterval;
    this.dashboardService.update(dashboard, dashboard.id).subscribe(ds => {
      this.dashboardIsClean = true;
    });
  }

  /**
   * Delete selected gauge because user has clicked on delete (ask confirmation before)
   * @param dashboard
   */
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
        this.dashboardIsClean = false;
      },
      reject: () => { }
    });
  }
  /**
   * Save or update selected gauge.
   * @param gaugeConfModif
   * @param index
   */
  onGaugeConfigChange(gaugeConfModif: IModification<BackendGaugeConfig>, index?: number): void {
    const operation = gaugeConfModif.operation;
    switch (operation) {
      case Operation.CREATE:
        this.gaugeConfigs.push(gaugeConfModif.item);
        this.gaugeConverter.getGaugeRawParamsObs(gaugeConfModif.item, this.timeRange.start, this.timeRange.end).subscribe(rawParam => {
          this.gaugeRawParams.push(rawParam);
          // TODO set gauge to loading ?
        });
        break;
      case Operation.UPDATE:
        this.gaugeConfigs[index] = gaugeConfModif.item;
        this.gaugeConverter.getGaugeRawParamsObs(gaugeConfModif.item, this.timeRange.start, this.timeRange.end).subscribe(rawParam => {
          this.gaugeRawParams[index] = rawParam;
          // TODO set gauge to loading ?
        });
        break;
    }
    this.displayGaugeForm = false;
    this.dashboardIsClean = false;
  }

  subscribeToRefreshChanges(t: number): void {
    this.updateGaugesData(this.gaugeConfigs);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    console.error('should be overriden by mixins');
  }

  /**
   * SECTION Gauges updates
   * iterate all BackendGaugeConfig and update all GaugeParams accordingly
   */
  private updateGaugesData(gaugesConf: BackendGaugeConfig[]): void {
    this.refreshingGauges = true;
    console.log('UPDATE GRAPH DATA');
    if (this.measuresRefreshSubscription && !this.measuresRefreshSubscription.closed) {
      this.measuresRefreshSubscription.unsubscribe();
    }
    const neededTagIds: string[] = Array.from(this.gaugeConverter.getNeededTagsIdForArray(gaugesConf));
    const requests: MeasuresRequest[] = neededTagIds.map(tagId => {
      return this.gaugeConverter.buildTagMeasureRequestForGauge(tagId, this.timeRange.start, this.timeRange.end);
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
          this.gaugeRawParams = this.gaugeConverter.getGaugesRawParams(gaugesConf, lastTagsValue);
          this.error = false;
          this.refreshingGauges = false;
        },
        error => {
          this.error = true;
          console.log('error requesting data', error);
          this.refreshingGauges = false;
        }
      );
    } else {
      this.gaugeRawParams = this.gaugeConverter.getGaugesRawParams(gaugesConf, new Map());
      this.error = false;
      this.refreshingGauges = false;
    }
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
      new ArrayQuestion<ZoneRange>(zoneQuestions),
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
        required: true,
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
// Add properties from ComponentCanDeactivate into GaugeDashboardComponent. It is a workaround for multiple inheritance or Trait scalalike.
applyMixins(GaugeDashboardComponent, [ComponentCanDeactivate]);
