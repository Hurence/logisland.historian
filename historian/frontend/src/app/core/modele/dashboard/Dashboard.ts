import { BackGauge } from '../gauge/Gauge';

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
