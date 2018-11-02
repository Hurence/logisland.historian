export interface IImportTagReport {
  start_time?: number;
  import_duration?: number;
  num_tags_imported?: number;
  num_tags_not_imported?: number;
  errors?: string[];
}
