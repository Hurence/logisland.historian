import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service';
import { ProfilService } from '../../profil/profil.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionService } from '../../shared/dynamic-form/question.service';
import { Tag, ITag } from '../modele/tag';
import { TagTreeComponent, TreeTagSelect } from '../tag-tree/tag-tree.component';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagService } from '../service/tag.service';
import { ITagFormInput, TagFormInput } from '../tag-form/TagFormInput';

@Component({
  selector: 'app-tag-dashboard',
  templateUrl: './tag-dashboard.component.html',
  styleUrls: ['./tag-dashboard.component.css']
})
export class TagDashboardComponent implements OnInit {

  dataSet: Dataset;
  selectedTags: ITagFormInput[];
  filterPlaceHolder = 'Type to filter by type or by description...';
  questionsMultiSelection: QuestionBase<any>[] = [];
  questionsSingleSelection: QuestionBase<any>[] = [];

  @ViewChild(TagTreeComponent)
  private tsListComp: TagTreeComponent;

  constructor(private datasetService: DatasetService,
    private router: Router,
    private route: ActivatedRoute,
    private profilService: ProfilService,
    private qs: QuestionService) {
      this.selectedTags = [];
    }

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
  onSelectTag(select: TreeTagSelect): void {
    if (select) {
      this.selectedTags = select.selectedTags.map(tag => new TagFormInput(tag))
    }
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onFilterQuery(query: string) {
    this.tsListComp.dataTreeComp.search(query);
  }

  anyTagSelected(): boolean {
    return this.selectedTags.length !== 0;
  }

  multipleTagSelected(): boolean {
    return this.selectedTags.length > 1;
  }
  // update tag in tree.
  onTagSaved(tag: IHistorianTag): void {    
    const nodeToUpdate = this.tsListComp.dataTreeComp.getNode(tag.id);
    Object.assign(nodeToUpdate.original.tag, tag);  
  }

}
