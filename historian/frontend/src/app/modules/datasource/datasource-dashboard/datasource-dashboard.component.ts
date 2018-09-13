import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, TreeNode } from 'primeng/api';
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
import { Observable, Subscription } from 'rxjs';
import { ComponentCanDeactivate } from '../../../shared/BaseCompoenentCanDeactivate';
import { HttpErrorResponse } from '@angular/common/http';
import { NgTreenodeService } from '../../tag/service/ng-treenode.service';
import { TagOpcService } from '../../tag/service/tag-opc.service';

@Component({
  selector: 'app-datasource-dashboard',
  templateUrl: './datasource-dashboard.component.html',
  styleUrls: ['./datasource-dashboard.component.css']
})
export class DatasourceDashboardComponent extends ComponentCanDeactivate implements OnInit, OnDestroy {

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

  private treeNodes: TreeNode[];
  private errorMsg: string;
  private connectivityOk: boolean = false;
  private loadingTags: boolean = false;
  private loadTagsSubscription: Subscription;

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
              private tagOpcService: TagOpcService,
              private ngTreenodeService: NgTreenodeService,
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

  ngOnDestroy() {
    this.unsubscribeLoadTags();
  }

  private unsubscribeLoadTags() {
    if (this.loadTagsSubscription && !this.loadTagsSubscription.closed) {
      this.loadTagsSubscription.unsubscribe();
    }
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
    // update tags
    this.treeNodes = [];
    if (datasource !== null) {
      this.loadingTags = true;
      this.unsubscribeLoadTags();
      switch (datasource.tag_browsing) {
        case TagBrowsingMode.MANUAL:
          this.loadTagsSubscription = this.tagHistorianService.getAllFromDatasource(datasource.id).subscribe(
            tags => {
              this.connectivityOk = true;
              this.treeNodes = tags.map(tag => this.ngTreenodeService.buildNodeFromTag(tag));
              this.treeNodes.forEach(node => node.label = node.data.node_id);
              if (this.treeNodes.length === 0) {
                this.treeNodes.push(this.ngTreenodeService.getEmptyNode());
              }
            },
            error => {
              this.errorMsg = `Could not connect to Datasource.`;
              this.connectivityOk = false;
              this.loadingTags = false;
            },
            () => {
              this.loadingTags = false;
            }
          );
          break;
        case TagBrowsingMode.AUTOMATIC:
          this.loadTagsSubscription = this.tagOpcService.browseTags(
            datasource.id,
            { nodeId: datasource.findRootNodeId(), depth: 1 }
          ).subscribe(
            tags => {
              this.connectivityOk = true;
              this.treeNodes = tags.map(tag => this.ngTreenodeService.buildNodeFromTag(tag));
            },
            error => {
              this.errorMsg = `Could not connect to Datasource.`;
              this.connectivityOk = false;
              this.loadingTags = false;
            },
            () => {
              this.loadingTags = false;
            }
          );
          break;
        default:
          console.error('TagBrowsingMode should be MANUAL :', datasource.tag_browsing);
          break;
      }
    }
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

  private showHelpCreateDatasource(): boolean {
    // console.log('showHelpCreateDatasource');
    return !this.profilService.helpHidden && this.dslistComp.datasources && this.dslistComp.datasources.length === 0;
  }

  private showHelpSelectDatasource(): boolean {
    // console.log('showHelpSelectDatasource');
    return !this.showHelpCreateDatasource() && (this.selectedDatasource === null || this.selectedDatasource === undefined);
  }
}
