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

export interface Dashboard {
  id: string;
  name: string;
  owner: string;
  description: string;
  permissions?: any;
  from: string;
  to: string;
  autorefresh: number; // long
  panels: BackGauge[];
}

