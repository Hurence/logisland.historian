import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service.';
import { ProfilService } from '../../profil/profil.service';
import { Tag } from '../tag';
import { TagsListComponent } from '../tags-list/tags-list.component';
import { QuestionService } from '../../shared/dynamic-form/question.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';

@Component({
  selector: 'app-tag-dashboard',
  templateUrl: './tag-dashboard.component.html',
  styleUrls: ['./tag-dashboard.component.css']
})
export class TagDashboardComponent implements OnInit {

  dataSet: Dataset;
  selectedTags: Set<Tag> = new Set();
  lastSelectedTag: Tag;
  filterPlaceHolder = 'Type to filter by type or by description...';
  questionsMultiSelection: QuestionBase<any>[] = [];
  questionsSingleSelection: QuestionBase<any>[] = [];

  @ViewChild(TagsListComponent)
  private tsListComp: TagsListComponent;
  
  constructor(private datasetService: DatasetService,
    private router: Router,
    private route: ActivatedRoute,
    private profilService: ProfilService,
    private qs: QuestionService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
 
    this.questionsMultiSelection = this.qs.getTagFormMultiSelection();
    this.questionsSingleSelection = this.qs.getTagFormSingleSelection();
  }

  datasetHasNoTags(): boolean {    
    return this.dataSet.hasNoTag();
  }

  goToDatasource(): void {
    this.router.navigate(['../datasources'], { relativeTo: this.route });
  }

  goToConfig(): void {
    this.router.navigate(['../configuration'], { relativeTo: this.route });
  }

  /* DO
  nothing if tag is null
  remove tag if already selected
  else add tag to selection */
  onSelectTag(tag: Tag): void {    
    if (tag !== null && !this.selectedTags.delete(tag)) {      
      this.selectedTags.clear();//TODO remove when enabling multiselect
      this.selectedTags.add(tag);
      this.lastSelectedTag = tag;
    } else {//unselect tag
      this.lastSelectedTag = null;
    }
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onFilterQuery(query: string) {
    this.tsListComp.getTagsQuery(query);
  }

  anyTagSelected(): boolean {
    return this.selectedTags.size !== 0;
  }

  multipleTagSelected(): boolean {
    return this.selectedTags.size > 1;
  }

  onTagSaved(tag: Tag) {
    //TODO update tag in tree.
  }
}
