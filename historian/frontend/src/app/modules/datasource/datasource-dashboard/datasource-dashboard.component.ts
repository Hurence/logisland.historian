import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../../../can-deactivate-guard.service';
import { DialogService } from '../../../dialog/dialog.service';
import { ProfilService } from '../../../profil/profil.service';
import { Datasource } from '../Datasource';
import { DatasourceFormComponent } from '../datasource-form/datasource-form.component';
import { DatasourcesListComponent } from '../datasources-list/datasources-list.component';
import { ITag } from '../../tag/modele/tag';
import { TagService } from '../../tag/service/tag.service';
import { OpcTagTreeComponent } from '../../tag/tag-tree/opc-tag-tree/opc-tag-tree.component';

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

  @ViewChild(DatasourceFormComponent)
  private dsFrmComp: DatasourceFormComponent;
  @ViewChild(DatasourcesListComponent)
  private dslistComp: DatasourcesListComponent;
  @ViewChild(OpcTagTreeComponent)
  private tagTree: OpcTagTreeComponent;
  private DISCARD_CHANGE_QUESTION_MSG = 'Discard changes ?';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private profilService: ProfilService,
              private tagService: TagService) { }

  ngOnInit() {
    this.isCreation = true;
    this.selectDatasource(null);
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

  onFilterQuery(query: string) {
    this.dslistComp.getDatasourcesQuery(query);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dsFormIsClean()) return true;
    return this.dialogService.confirm(this.DISCARD_CHANGE_QUESTION_MSG);
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
      this.tagService.gets([this.selectedDatasource.id]).subscribe(tags => {
        this.tags = tags;
      });
      this.selectedTab = this.DATASOURCE_TAGS_TAB_INDEX;
    }
  }
}
