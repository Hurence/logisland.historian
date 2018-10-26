export interface AutoRefreshInterval {
  label: string;
  refrashInterval: string;
}
/*
TimeRangeFilter calue of start and end should be string understandable by chronix
*/
export const autoRefreshIntervalBuiltIn: {[key: string]: AutoRefreshInterval} = {
  NONE: {label: 'None', refrashInterval: undefined},
  FIVE_SECONDS: {label: '5 seconds', refrashInterval: '5000'},
  TEN_SECONDS: {label: '10 seconds', refrashInterval: '10000'},
  THIRTY_SECONDS: {label: '30 seconds', refrashInterval: '30000'},
  FORTY_FIVE_SECONDS: {label: '45 seconds', refrashInterval: '45000'},
  ONE_MINUTE: {label: '1 minute', refrashInterval: '60000'},
  FIVE_MINUTES: {label: '5 minutes', refrashInterval: '300000'},
  FIFTEEN_MINUTES: {label: '15 minutes', refrashInterval: '900000'},
  THIRTY_MINUTES: {label: '30 minutes', refrashInterval: '1800000'},
  ONE_HOUR: {label: '1 hour', refrashInterval: '3600000'},
  TWO_HOURS: {label: '2 hours', refrashInterval: '7200000'},
  TWELVE_HOURS: {label: '12 hours', refrashInterval: '43200000'},
  ONE_DAY: {label: '1 day', refrashInterval: '86400000'}
};

export class AutoRefreshIntervalUtils {
  public static getAutoRefreshInterval(refrashInterval: string): AutoRefreshInterval {
    // if BUILT IN REFRESH INTERVAL RETURN IT
    for (const key of Object.keys(autoRefreshIntervalBuiltIn)) {
      const autoRefreshInterval = autoRefreshIntervalBuiltIn[key];
      if (autoRefreshInterval.refrashInterval === refrashInterval) {
        return autoRefreshInterval;
      }
    }
    return autoRefreshIntervalBuiltIn.NONE;
  }
}
