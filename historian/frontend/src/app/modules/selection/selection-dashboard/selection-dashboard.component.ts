import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

import { DialogService } from '../../../dialog/dialog.service';
import { ProfilService } from '../../../profil/profil.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { TagsSelection, TagsSelectionArray } from '../Selection';
import { SelectionFormComponent } from '../selection-form/selection-form.component';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-selection-dashboard',
  templateUrl: './selection-dashboard.component.html',
  styleUrls: ['./selection-dashboard.component.css']
})
export class SelectionDashboardComponent implements OnInit {

  // dropdown select current selection of tags
  selectionOptions: SelectItem[];
  private _currentSelection: TagsSelection;

  // Form to add new selection of tags
  display = false;
  selectionQuestions: QuestionBase<any>[];
  selectionOfTagsInForm: TagsSelection;

  private CANCEL_MSG = 'Cancel';
  private REMOVE_SELECTION_MSG = 'Remove selection of tags';

  @ViewChild(SelectionFormComponent) private tagSelectionFormComp: SelectionFormComponent;

  constructor(private profilService: ProfilService,
              private dialogService: DialogService,
              private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectionQuestions = this.getMyQuestions();
    this.selectionOfTagsInForm = new TagsSelection({name: '', tagIds: new Set()});
    this.actualizeListOfTagsSelection();
  }

  onSelectionChange(event) {}

  showDialog() {
      this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  onCreated(selection: TagsSelection) {
    this.selectionOfTagsInForm = new TagsSelection({name: '', tagIds: new Set()});
    this.profilService.currentTagsSelection = selection;
    this.actualizeListOfTagsSelection();
    this.closeDialog();
  }

  actualizeListOfTagsSelection() {
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      selectionsWithSet.push(this.profilService.getDefautSelection());
      this.selectionOptions = selectionsWithSet.map(selection => {
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
