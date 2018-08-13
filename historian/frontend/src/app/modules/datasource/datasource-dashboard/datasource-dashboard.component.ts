import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataFlowService } from '../../../dataflow.service';
import { ProfilService } from '../../../profil/profil.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { QuestionService } from '../../../shared/dynamic-form/question.service';
import { HistorianTag } from '../../tag/modele/HistorianTag';
import { TagDataType, TagRecordType } from '../../tag/modele/tag';
import { AddTagFormComponent } from '../../tag/tag-form/add-tag-form/add-tag-form.component';
import { OpcTagTreeComponent } from '../../tag/tag-tree/opc-tag-tree/opc-tag-tree.component';
import { Datasource, DatasourceType, TagBrowsingMode } from '../Datasource';
import { DatasourcesListComponent } from '../datasources-list/datasources-list.component';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent implements OnInit {

  selectedDatasource: Datasource;
  datasourceToCreate: Datasource;
  filterPlaceHolder = 'Type to filter by type or by description...';
  // add tag form
  createdTag: HistorianTag;
  disaplyAddTagForm = false;
  displayAddDatasource = false;
  tagQuestions: QuestionBase<any>[];

  isApplyBtnEnabled: boolean = true;

  @ViewChild(DatasourcesListComponent)
  private dslistComp: DatasourcesListComponent;
  @ViewChild(OpcTagTreeComponent)
  private tagTree: OpcTagTreeComponent;
  @ViewChild(AddTagFormComponent)
  private addTagForm: AddTagFormComponent;
  private DISCARD_CHANGE_QUESTION_MSG = 'Discard changes ?';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profilService: ProfilService,
              private questionService: QuestionService,
              private dataFlowService: DataFlowService,
              protected messageService: MessageService) {
                this.createdTag = new HistorianTag({
                  record_type: TagRecordType.TAG,
                  id: '',
                  node_id: '',
                  datasource_id: '',
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
    this.tagQuestions = this.questionService.getAddTagForm();
  }

  onSelectDatasource(datasource: Datasource) {
    this.selectDatasource(datasource);
  }

  goToTags() {
    this.router.navigate(['../tags'], { relativeTo: this.route });
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

  onClickAddDatasource() {
    this.datasourceToCreate = new Datasource({
      id: '',
      datasource_type: DatasourceType.OPC_UA,
      tag_browsing: TagBrowsingMode.MANUAL
    });
    this.displayAddDatasource = true;
  }

  onClickAddTag() {
    this.createdTag = this.createTag();
    this.disaplyAddTagForm = true;
  }

  createTag(): HistorianTag {
    return new HistorianTag({
      record_type: TagRecordType.TAG,
      id: '',
      node_id: '',
      datasource_id: this.selectedDatasource.id,
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

  private selectDatasource(datasource: Datasource) {
    this.selectedDatasource = datasource;
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

  isAddTagDisabled(ds: Datasource): boolean {
    return (ds === null || ds === undefined || !ds.isManual());
  }

  isDatasourceAutomatic(ds: Datasource): boolean {
    return (ds !== null && ds !== undefined && ds.isAutomatic());
  }

  onSubmitted(ds: Datasource) {
    this.dslistComp.getDatasources();
    this.selectedDatasource = ds;
    this.displayAddDatasource = false;
  }

  onCloseAddTag() {
    this.addTagForm.resetDisplay();
  }

  generateConfiguration() {
    this.isApplyBtnEnabled = false;
    this.dataFlowService.autoUpdateConfiguration('OpcTagsInjector').subscribe(
      success => {
        this.messageService.add({
          severity: 'success',
          summary: `successfully updated configuration`,
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: `Failed to update configuration`,
        });
        this.isApplyBtnEnabled = true;
      },
      () => {
        this.isApplyBtnEnabled = true;
      }
    );
  }
}
