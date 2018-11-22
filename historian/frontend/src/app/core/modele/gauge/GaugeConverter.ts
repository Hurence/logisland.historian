import { Injectable } from '@angular/core';
import { TagHistorianService } from '../../../modules/tag/service/tag-historian.service';
import { BackGauge, BackendGaugeConfig, BackZoneRange, ZoneRangeConfig, GaugeRawParams } from './Gauge';
import { Observable, of } from 'rxjs';
import { HistorianTag } from '../../../modules/tag/modele/HistorianTag';
import { map } from 'rxjs/operators';
import { TagUtils } from '../../../modules/tag/modele/TagUtils';
import { ZoneRangeColors, ZoneRange } from '../../../modules/graph/gauge-chart/gauge';
import { MeasuresRequest } from '../../../measure/MeasuresRequest';
import { MeasuresService } from '../../../measure/measures.service';
import { IAgregation } from '../../../measure/Measures';

@Injectable()
export class GaugeConverter {

  constructor(private tagHistorianService: TagHistorianService,
              private measuresService: MeasuresService) {}

  /**
   * Convert an array of BackGauge into an array of BackendGaugeConfig (replacing id of tag by tag object).
   * It will request all needed tag in one request. That's why the response is an Observable.
   * @param gauges
   */
  convertBackGaugeToBackendGaugeQueryingTags(gauges: BackGauge[]): Observable<BackendGaugeConfig[]> {
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

  /**
   * build gaugeConfig with tags depending on backend input gauge
   * @param g
   * @param tagMap
   */
  private convertBackGaugeToBackendGaugeKnowingTags(g: BackGauge, tagMap: Map<string, HistorianTag>): BackendGaugeConfig {
    let zrs: ZoneRangeConfig[] = [];
    if (g.zoneranges && g.zoneranges.length !== 0) {
      zrs = g.zoneranges
        .map(z => this.getZoneRangeConfig(z, tagMap));
    }

    const bgc: BackendGaugeConfig = {
      value: tagMap.get(g['value']),
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




 /**
   * Convert a BackendGaugeConfig into BackGauge in order to save it in backend (replacing tag by id of tag).
   *
   * @param gauges
   */
  convertBackendGaugeToBackGauge(bgc: BackendGaugeConfig): BackGauge {
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

  /**
   * Convert an array of BackendGaugeConfig into an array of GaugeRawParams (replacing tags by last value of tags).
   *
   * @param gaugesConf BackendGaugeConfig array to convert.
   * @param lastTagsValue map of <tag id>/<last tag value> pair used to retrieve last value of tags for GaugeRawParams
   */
  getGaugesRawParams(gaugesConf: BackendGaugeConfig[], lastTagsValue: Map<string, number>): GaugeRawParams[] {
    return gaugesConf.map(conf => this.getGaugeRawParams(conf, lastTagsValue));
  }

  /**
   * build GaugeRawParams putting
   * @param gaugeConf
   * @param lastTagsValue
   */
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
   * Convert a BackendGaugeConfig into a GaugeRawParams (replacing tags by last value of tags).
   * It will request all needed last tag value in one request. That's why the response is an Observable.
   *
   * @param gaugesConf BackendGaugeConfig array to convert.
   * @param start start used to request last value of a tag
   * @param end end used to request last value of a tag
   */
  getGaugeRawParamsObs(gaugeConf: BackendGaugeConfig, start: string, end: string): Observable<GaugeRawParams> {
    const neededTagIds: string[] = Array.from(this.getNeededTagsIdForArray([gaugeConf]));
    const requests: MeasuresRequest[] = neededTagIds.map(tagId => {
      return this.buildTagMeasureRequestForGauge(tagId, start, end);
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

  /**
   * Return all needed tag ids which we need to request last value for calculating GaugeRawParams
   *
   * @param gaugesConf BackendGaugeConfig array which we need to find tag dependencies.
   */
  getNeededTagsIdForArray(gaugesConf: BackendGaugeConfig[]): Set<string> {
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

  /**
   * Return a MeasuresRequest for retieving last value of a tag between two instant in time.
   *
   * @param tagId id from measure to request
   * @param start start for request
   * @param end end for request
   */
  buildTagMeasureRequestForGauge(tagId: string, start: string, end: string): MeasuresRequest {
    return new MeasuresRequest({
      itemId: tagId,
      start: start,
      end: end,
      functions: 'last',
      no_values: true
    });
  }


}
