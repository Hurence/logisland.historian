import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dataset } from '../../dataset/dataset';
import { DatasetService } from '../../dataset/dataset.service';
import { ProfilService } from '../../profil/profil.service';
import { QuestionBase } from '../../shared/dynamic-form/question-base';
import { QuestionService } from '../../shared/dynamic-form/question.service';
import { IHistorianTag } from '../modele/HistorianTag';
import { TagType } from '../modele/tag';
import { ITagFormInput, TagFormInput } from '../tag-form/TagFormInput';
import { TagTreeComponent, TreeTagSelect } from '../tag-tree/tag-tree.component';
import { TypesName } from '../tag-tree/TypesName';

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
  private tagTreeComp: TagTreeComponent;

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
    // TODO replace this by goToConfig when the corresponding page will be implemented
    // this.router.navigate(['../configuration'], { relativeTo: this.route });
    this.router.navigate(['/grapher'], { relativeTo: this.route });
  }

  /* DO
  nothing if tag is null
  remove tag if already selected
  else add tag to selection */
  onSelectTag(select: TreeTagSelect): void {
    if (select) {
      this.selectedTags = select.selectedTags.map(tag => new TagFormInput(tag));
    }
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onFilterQuery(query: string) {
    this.tagTreeComp.jsTree.search(query);
  }

  anyTagSelected(): boolean {
    return this.selectedTags.length !== 0;
  }

  multipleTagSelected(): boolean {
    return this.selectedTags.length > 1;
  }
  // update tag in tree.
  onTagSaved(tag: IHistorianTag): void {
    const nodeToUpdate = this.tagTreeComp.jsTree.getNode(tag.id);
    Object.assign(nodeToUpdate.original.tag, tag);
    this.tagTreeComp.jsTree.setType(nodeToUpdate, TypesName.TAG_HISTORIAN);
  }

}
