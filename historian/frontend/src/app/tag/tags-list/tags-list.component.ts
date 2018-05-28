import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { Observable } from 'rxjs/Observable';
import { Dataset } from '../../dataset/dataset';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  tagsMap: Map<string, Observable<Tag[]>>;
  // tags$: Observable<Tag[]>;
  @Input() dataSet: Dataset;
  @Input() selectedTags: Set<Tag>;
  @Output() selectedTagsE = new EventEmitter<Tag>();

  constructor(private tagService: TagService,
              private dialogService: DialogService) { 
                this.tagsMap = new Map();
              }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.dataSet.datasourceIds.forEach((id, idAgain, set) => {
      this.tagsMap.set(id, this.tagService.getTagsFromDatasource(id));
    });
  }

  getTagsQuery(query: string): void {
    this.dataSet.datasourceIds.forEach((id, idAgain, set) => {
      this.tagsMap.set(id, this.tagService.getTagsFromDatasourceQuery(id, query));
    });
  }

  isSelected(tag: Tag): boolean {
    return this.selectedTags.has(tag);
  }
 /* workaround to avoid problem using ngFor with iterables
    https://github.com/angular/angular/issues/13877
 */
  datasourcesId(): string[] {
    return Array.from(this.tagsMap.keys()); 
  }

  // getDatasourcesQuery(queryParameter: string) {
  //   this.datasources$ = this.datasourceService.getDatasourcesQuery(queryParameter)
  //     .pipe(catchError(error => of([])));
  // }

  // private onDeleteDatasource(datasource: Datasource): void {
  //   const msg = `Delete data source ${datasource.description} ${datasource.datasource_type} ?`;
  //   this.dialogService.confirm(msg, 'Cancel', 'Remove data source')
  //     .subscribe(ok => {
  //       if (ok) {
  //         this.datasourceService.deleteDatasource(datasource)
  //           .subscribe(deletedDs => {
  //             console.log('deleted datasource with id :' + deletedDs.id);
  //             this.dataSet.removeDatasource(deletedDs);
  //             this.getDatasources();
  //           });
  //       }
  //     });
  // }

  private onSelect(tag: Tag) {
    this.selectedTagsE.emit(tag);
  }

  // private onAddToDataset(datasource: Datasource) {
  //   this.dataSet.addDatasource(datasource);
  // }

  // private onRemoveFromDataset(datasource: Datasource) {
  //   this.dataSet.removeDatasource(datasource);
  // }

  // private dataSetContain(datasource: Datasource): boolean {
  //   if (this.dataSet) {
  //     return this.dataSet.containDatasource(datasource);
  //   }
  //   return false;
  // }
}
