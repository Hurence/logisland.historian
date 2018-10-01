export interface IBulkLoad {
  start_time?: number;
  generation_duration?: number;
  import_duration?: number;
  num_metrics_imported?: number;
  num_points_imported?: number;
  metrics?: string[];
}
