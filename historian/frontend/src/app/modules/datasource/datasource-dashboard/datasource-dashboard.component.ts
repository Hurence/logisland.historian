import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { DataFlowService } from '../../../dataflow.service';
import { ProfilService } from '../../../profil/profil.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { QuestionService } from '../../../shared/dynamic-form/question.service';
import { Utilities } from '../../../shared/utilities.service';
import { HistorianTag } from '../../tag/modele/HistorianTag';
import { TagDataType, TagRecordType } from '../../tag/modele/tag';
import { TagHistorianService } from '../../tag/service/tag-historian.service';
import { AddTagFormComponent } from '../../tag/tag-form/add-tag-form/add-tag-form.component';
import {
  OpcTagTreeAutomaticComponent,
} from '../../tag/tag-tree/opc-tag-tree/opc-tag-tree-automatic/opc-tag-tree-automatic.component';
import {
  OpcTagTreeManualComponent,
} from '../../tag/tag-tree/opc-tag-tree/opc-tag-tree-manual/opc-tag-tree-manual.component';
import { IModification, TagConfigurationToApply } from '../ConfigurationToApply';
import { Datasource, DatasourceType, TagBrowsingMode } from '../Datasource';
import { DatasourcesListComponent } from '../datasources-list/datasources-list.component';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../../../shared/BaseCompoenentCanDeactivate';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent extends ComponentCanDeactivate implements OnInit {

  tagConfigurationToApply: TagConfigurationToApply;
  selectedDatasource: Datasource;
  datasourceToCreate: Datasource;
  filterPlaceHolder = 'Type to filter by type or by description...';
  // add tag form
  createdTag: HistorianTag;
  disaplyAddTagForm = false;
  displayAddDatasource = false;
  tagQuestions: QuestionBase<any>[];

  isApplyBtnEnabled: boolean = false;
  isApplyingConf: boolean = false;

  @ViewChild(DatasourcesListComponent)
  private dslistComp: DatasourcesListComponent;
  @ViewChild(OpcTagTreeAutomaticComponent)
  private tagTreeAutomatic: OpcTagTreeAutomaticComponent;
  @ViewChild(OpcTagTreeManualComponent)
  private tagTreeManual: OpcTagTreeManualComponent;
  @ViewChild(AddTagFormComponent)
  private addTagForm: AddTagFormComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profilService: ProfilService,
              private questionService: QuestionService,
              private dataFlowService: DataFlowService,
              private tagHistorianService: TagHistorianService,
              private observerUtil: Utilities,
              protected messageService: MessageService,
              protected confirmationService: ConfirmationService) {
                super();
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
    this.tagConfigurationToApply = new TagConfigurationToApply();
  }

  onSelectDatasource(datasource: Datasource) {
    if (this.tagConfigurationToApply.isClean()) {
      this.selectDatasource(datasource);
    } else {
      this.confirmationService.confirm({
        message: `Vous n'avez pas validé vos modifications pour la datasource actuelle.
                  Voulez-vous les annulez ? Sinon merci d'anuller et d'appuyer sur le bouton apply.`,
        header: 'Confirmation',
        rejectLabel: 'Cancel',
        acceptLabel: 'Ok',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.selectDatasource(datasource);
        },
        reject: () => {}
      });
    }
  }

  canDeactivate(): boolean {
    return this.tagConfigurationToApply.isClean();
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
    this.tagConfigurationToApply = new TagConfigurationToApply();
    this.isApplyBtnEnabled = false;
  }


  /**
   * Update node of the saved tag.
   * Use this.nodeForRegister to improve performance, if this.nodeForRegister is null add a node with this tag
   * as the tag is considered to not be in tree.
   * @param tag saved in form by user
   */
  onTagCreated(modifTag: IModification<HistorianTag>): void {
    this.tagConfigurationToApply.addTagModification(modifTag);
    if (this.tagConfigurationToApply.isClean()) {
      this.isApplyBtnEnabled = false;
    } else {
      this.isApplyBtnEnabled = true;
    }
    this.disaplyAddTagForm = false;
    this.tagTreeManual.addNodeFromTag(modifTag.item);
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

  onModifiedTag(tagModification: IModification<HistorianTag>) {
    this.tagConfigurationToApply.addTagModification(tagModification);
    if (this.tagConfigurationToApply.isClean()) {
      this.isApplyBtnEnabled = false;
    } else {
      this.isApplyBtnEnabled = true;
    }
  }

  generateConfiguration() {
    this.isApplyBtnEnabled = false;
    this.isApplyingConf = true;
    this.tagConfigurationToApply.apply(this.tagHistorianService).subscribe(
      report => {
        this.dataFlowService.autoUpdateConfiguration('OpcTagsInjector').subscribe(
          success => {
            this.messageService.add({
              severity: 'success',
              summary: `successfully updated configuration`,
            });
            this.isApplyBtnEnabled = false;
            this.isApplyingConf = false;
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: `Failed to update configuration.`,
            });
            this.isApplyBtnEnabled = true;
            this.isApplyingConf = false;
          }
      );
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: `Failed to update tags`,
        });
        this.isApplyBtnEnabled = true;
        this.isApplyingConf = false;
      }
    );
  }

}
