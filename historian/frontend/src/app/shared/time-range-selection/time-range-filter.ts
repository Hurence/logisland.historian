export interface TimeRangeFilter {
  label: string;
  start: string;
  end: string;
}
/*
TimeRangeFilter calue of start and end should be string understandable by chronix
*/
export const timeRangeBuiltIn: {[key: string]: TimeRangeFilter} = {
  TODAY: {label: 'Today', start: 'NOW/DAY', end: 'NOW+1DAY/DAY'},
  // {label: 'This week', start: 'NOW/WEEK', end: 'NOW+1WEEK/WEEK'},
  THIS_MONTH: {label: 'This month', start: 'NOW/MONTH', end: 'NOW+1MONTH/MONTH'},
  THIS_YEAR: {label: 'This year', start: 'NOW/YEAR', end: 'NOW+1YEAR/YEAR'},
  THE_DAY_SO_FAR: {label: 'The day so far', start: 'NOW/DAY', end: 'NOW'},
  // {label: 'Week to date', start: 'NOW/WEEK', end: 'NOW'},
  MONTH_TO_DATE: {label: 'Month to date', start: 'NOW/MONTH', end: 'NOW'},
  YEAR_TO_DATE: {label: 'Year to date', start: 'NOW/YEAR', end: 'NOW'}, // yyyy-mm-ddThh:mm:ss.mmmZ
  YESTERDAY: {label: 'Yesterday', start: 'NOW-1DAY/DAY', end: 'NOW/DAY'},
  DAY_BEFORE_YESTERDAY: {label: 'Day before yesterday', start: 'NOW-2DAYS/DAY', end: 'NOW-1DAY/DAY'},
  THIS_DAY_LAST_WEEK: {label: 'This day last week', start: 'NOW-7DAYS/DAY', end: 'NOW-6DAYS/DAY'},
  // {label: 'Previous week', start: 'NOW-1WEEK/WEEK', end: 'NOW/WEEK'},
  PREVIOUS_MONTH: {label: 'Previous month', start: 'NOW-1MONTH/MONTH', end: 'NOW/MONTH'},
  PREVIOUS_YEAR: {label: 'Previous year', start: 'NOW-1YEAR/YEAR', end: 'NOW/YEAR'},
  LAST_15_MINUTES: {label: 'Last 15 minutes', start: 'NOW-15MINUTES', end: 'NOW'},
  LAST_30_MINUTES: {label: 'Last 30 minutes', start: 'NOW-30MINUTES', end: 'NOW'},
  LAST_1_HOUR: {label: 'Last 1 hour', start: 'NOW-1HOUR', end: 'NOW'},
  LAST_4_HOURS: {label: 'Last 4 hours', start: 'NOW-4HOURS', end: 'NOW'},
  LAST_12_HOURS: {label: 'Last 12 hours', start: 'NOW-12HOURS', end: 'NOW'},
  LAST_24_HOURS: {label: 'Last 24 hours', start: 'NOW-24HOURS', end: 'NOW'},
  LAST_7_DAYS: {label: 'Last 7 days', start: 'NOW-7DAYS', end: 'NOW'},
  LAST_30_DAYS: {label: 'Last 30 days', start: 'NOW-30DAYS', end: 'NOW'},
  LAST_60_DAYS: {label: 'Last 60 days', start: 'NOW-60DAYS', end: 'NOW'},
  LAST_90_DAYS: {label: 'Last 90 days', start: 'NOW-90DAYS', end: 'NOW'},
  LAST_6_MONTHS: {label: 'Last 6 months', start: 'NOW-6MONTHS', end: 'NOW'},
  LAST_YEAR: {label: 'Last 1 year', start: 'NOW-1YEAR', end: 'NOW'},
  LAST_2_YEARS: {label: 'Last 2 years', start: 'NOW-2YEARS', end: 'NOW'},
  LAST_5_YEARS: {label: 'Last 5 year', start: 'NOW-5YEARS', end: 'NOW'}
};

export class TimeRangeFilterUtils {

  public static equals(timeRangeA: TimeRangeFilter, timeRangeB: TimeRangeFilter): boolean {
    return timeRangeA && timeRangeB && timeRangeA.start === timeRangeB.start && timeRangeA.end === timeRangeB.end;
  }
}
