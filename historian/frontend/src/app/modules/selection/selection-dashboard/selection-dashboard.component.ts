import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

import { ProfilService } from '../../../profil/profil.service';

import { TagsSelection } from '../Selection';
import { SelectionService } from '../selection.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { SelectionFormComponent } from '../selection-form/selection-form.component';
import { DialogService } from '../../../dialog/dialog.service';

@Component({
  selector: 'app-selection-dashboard',
  templateUrl: './selection-dashboard.component.html',
  styleUrls: ['./selection-dashboard.component.css']
})
export class SelectionDashboardComponent implements OnInit {

  // dropdown select current selection of tags
  selectionOptions: SelectItem[];
  currentSelection: TagsSelection;

  // Form to add new selection of tags
  display = false;
  selectionQuestions: QuestionBase<any>[];
  selectionOfTagsInForm: TagsSelection;

  private CANCEL_MSG = 'Cancel';
  private REMOVE_SELECTION_MSG = 'Remove selection of tags';

  @ViewChild(SelectionFormComponent) private tagSelectionFormComp: SelectionFormComponent;

  constructor(private profilService: ProfilService,
              private dialogService: DialogService,
              // private tagService: TagHistorianService,
              private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectionQuestions = this.getMyQuestions();
    this.selectionOfTagsInForm = new TagsSelection({name: 'new selection', tagIds: []});
    this.currentSelection = this.profilService.currentTagsSelection;
    this.actualizeListOfTagsSelection();
  }

  onSelectionChange(event) {
    this.currentSelection = event.value;
  }

  showDialog() {
      this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  onCreated(selection: TagsSelection) {
    this.selectionOfTagsInForm = new TagsSelection({name: 'new selection', tagIds: []});
    this.currentSelection = selection;
    this.actualizeListOfTagsSelection();
    this.closeDialog();
  }

  actualizeListOfTagsSelection() {
    this.selectionService.getAll().subscribe(selections => {
      selections.push(this.profilService.currentTagsSelection);
      this.selectionOptions = selections.map(selection => {
        return {label: selection.name, value: selection};
      });
    });
  }

  delete(selection: TagsSelection) {
    const msg = `Delete selection of tags ${selection.name} (${selection.description}) ?`;
    this.dialogService.confirm(msg, this.CANCEL_MSG, this.REMOVE_SELECTION_MSG)
      .subscribe(ok => {
        if (ok) {
          this.selectionService.delete(selection.getId())
            .subscribe(deletedSelection => {
              this.actualizeListOfTagsSelection();
            });
        }
      });
  }

  private getMyQuestions(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        placeholder: 'name for the selection',
        order: 1,
        required: true,
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        placeholder: 'description...',
        required: false,
        order: 2
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
