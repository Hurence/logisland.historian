import { HistorianTag } from '../../../modules/tag/modele/HistorianTag';
import { ZoneRangeColors, ZoneRange } from '../../../modules/graph/gauge-chart/gauge';

/**
 * Modele for gauge-dashboard.component.ts
 */
export interface BackZoneRange {
  from: number | string; // number or tag id
  to: number | string; // number or tag id
  color: string;
}

export interface BackGauge {
  type: string;
  name: string;
  from?: string;
  to?: string;
  autorefresh?: number;
  value: string;
  min: number | string;
  max: number | string;
  zoneranges: BackZoneRange[];
}

export interface GaugeRawParams {
  value: number;
  min: number;
  max: number;
  label: string;
  greenZones: ZoneRange[];
  yellowZones: ZoneRange[];
  redZones: ZoneRange[];
}

/**
 * Modele for gauge-form.component.ts
 */
export interface ZoneRangeConfig {
  from: number | HistorianTag;
  to: number | HistorianTag;
  color: ZoneRangeColors;
}

export interface BackendGaugeConfig {
  value: HistorianTag;
  label: string;
  min: number | HistorianTag;
  max: number | HistorianTag;
  zoneranges: ZoneRangeConfig[];
}
