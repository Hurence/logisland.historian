import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import { CanComponentDeactivate } from '../../../can-deactivate-guard.service';
import { ProfilService } from '../../../profil/profil.service';
import { Datasource, TagBrowsingMode } from '../Datasource';
import { DatasourceFormComponent } from '../datasource-form/datasource-form.component';
import { DatasourcesListComponent } from '../datasources-list/datasources-list.component';
import { ITag, TagDataType } from '../../tag/modele/tag';
import { TagService } from '../../tag/service/tag.service';
import { OpcTagTreeComponent } from '../../tag/tag-tree/opc-tag-tree/opc-tag-tree.component';
import { ConfirmationService } from 'primeng/components/common/api';
import { TagHistorianService } from '../../tag/service/tag-historian.service';
import { HistorianTag } from '../../tag/modele/HistorianTag';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { QuestionService } from '../../../shared/dynamic-form/question.service';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit, CanComponentDeactivate {

  private DATASOURCE_FORM_TAB_INDEX = 1;
  private DATASOURCE_TAGS_TAB_INDEX = 0;

  selectedTab = this.DATASOURCE_TAGS_TAB_INDEX;
  selectedDatasource: Datasource;
  tags: ITag[];
  isCreation: boolean;
  filterPlaceHolder = 'Type to filter by type or by description...';
  // add tag form
  createdTag: HistorianTag;
  disaplyAddTagForm = false;
  tagQuestions: QuestionBase<any>[];

  @ViewChild(DatasourceFormComponent)
  private dsFrmComp: DatasourceFormComponent;
  @ViewChild(DatasourcesListComponent)
  private dslistComp: DatasourcesListComponent;
  @ViewChild(OpcTagTreeComponent)
  private tagTree: OpcTagTreeComponent;
  private DISCARD_CHANGE_QUESTION_MSG = 'Discard changes ?';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private profilService: ProfilService,
              private tagService: TagService,
              private tagHistorianService: TagHistorianService,
              private questionService: QuestionService) {
                this.createdTag = new HistorianTag({
                  id: '',
                  datasource_id: '',
                  domain: '',
                  server: '',
                  group: '',
                  tag_name: '',
                  data_type: TagDataType.INT,
                  update_rate: 60000,
                  enabled: true,
                  // creation_date: Date.now(),
                  // last_modification_date: Date.now(),
                  // last_polling_date: Date.now(),
                  // min_numeric_value: 1,
                  // max_numeric_value: 1,
                  // last_numeric_value: 1,
                  // last_quality: 1,
                });
              }

  ngOnInit() {
    this.isCreation = true;
    this.selectDatasource(null);
    this.tagQuestions = this.questionService.getAddTagForm();
  }

  dsFormIsClean(): Boolean {
    return !this.dsFrmComp.formIsClean();
  }

  onSelectDatasource(datasource: Datasource) {
    if (this.dsFormIsClean()) {
      this.selectDatasource(datasource);
    } else {
      const canSwitch = this.canDeactivate();
      if (typeof canSwitch === 'boolean') {
        if (canSwitch) {
          this.selectDatasource(datasource);
        }
      } else {
        canSwitch.subscribe(bool => {
          if (bool) {
            this.selectDatasource(datasource);
          }
        });
      }
    }
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onSubmitted(ds: Datasource) {
    this.dslistComp.getDatasources();
    this.selectedDatasource = ds;
    this.isCreation = false;
  }

  onClickAddDatasource() {
    this.onSelectDatasource(null);
  }

  onClickAddTag() {
    this.createdTag = this.createTag();
    this.disaplyAddTagForm = true;
  }

  createTag(): HistorianTag {
    return new HistorianTag({
      id: '',
      datasource_id: this.selectedDatasource.id,
      domain: this.selectedDatasource.domain,
      server: this.selectedDatasource.host,
      group: '',
      tag_name: '',
      data_type: TagDataType.INT,
      update_rate: 60000,
      enabled: true,
      // creation_date: Date.now(),
      // last_modification_date: Date.now(),
      // last_polling_date: Date.now(),
      // min_numeric_value: 1,
      // max_numeric_value: 1,
      // last_numeric_value: 1,
      // last_quality: 1,
    });
  }

  onFilterQuery(query: string) {
    this.dslistComp.getDatasourcesQuery(query);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dsFormIsClean()) return true;
    return Observable.create((observer: Observer<boolean>) => {
      this.confirmationService.confirm({
          message: this.DISCARD_CHANGE_QUESTION_MSG,
          rejectLabel: 'Cancel',
          acceptLabel: 'Ok',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              observer.next(true);
              observer.complete();
          },
          reject: () => {
              observer.next(false);
              observer.complete();
          }
      });
    });
  }

  private selectDatasource(datasource: Datasource) {
    if (datasource === null || datasource.id === this.selectedDatasource.id) {
      this.isCreation = true;
      this.selectedDatasource = new Datasource({id: '', datasource_type: 'OPC-DA'});
      this.tags = [];
      this.selectedTab = this.DATASOURCE_FORM_TAB_INDEX;
    } else {
      this.isCreation = false;
      this.selectedDatasource = datasource;
      this.tagTree.setLoading();
      switch (datasource.tag_browsing) {
        case TagBrowsingMode.AUTOMATIC:
          this.tagService.gets([this.selectedDatasource.id]).subscribe(tags => {
            this.tags = tags;
          });
          break;
        case TagBrowsingMode.MANUAL:
          this.tagHistorianService.getAllFromDatasource(datasource.id).subscribe(tags => {
            this.tags = tags;
          });
          break;
        default:
          console.error('unknown TagBrowsingMode type :', datasource.tag_browsing);
          break;
      }
      this.selectedTab = this.DATASOURCE_TAGS_TAB_INDEX;
    }
  }


  /**
   * Update node of the saved tag.
   * Use this.nodeForRegister to improve performance, if this.nodeForRegister is null add a node with this tag
   * as the tag is considered to not be in tree.
   * @param tag saved in form by user
   */
  onTagCreated(tag: HistorianTag): void {
    this.disaplyAddTagForm = false;
    this.tagTree.addNodeFromTag(tag);
  }
}
