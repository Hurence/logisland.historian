import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

import { ProfilService } from '../../../profil/profil.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { TagsSelection, TagsSelectionArray } from '../Selection';
import { SelectionFormComponent } from '../selection-form/selection-form.component';
import { SelectionService } from '../selection.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { IModification } from '../../datasource/ConfigurationToApply';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-selection-dashboard',
  templateUrl: './selection-dashboard.component.html',
  styleUrls: ['./selection-dashboard.component.css']
})
export class SelectionDashboardComponent implements OnInit {

  selectionOptions: SelectItem[];

  @Input() tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();
  // Form to add new selection of tags
  display = false;
  selectionQuestions: QuestionBase<any>[];

  private CANCEL_MSG = 'Cancel';
  private REMOVE_SELECTION_MSG = 'Remove selection of tags';

  @ViewChild(SelectionFormComponent) private tagSelectionFormComp: SelectionFormComponent;

  constructor(private confirmationService: ConfirmationService,
              private selectionService: SelectionService,
              public profilService: ProfilService) {}

  ngOnInit() {
    this.selectionQuestions = this.getMyQuestions();
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      this.selectionOptions = selectionsWithSet.map(selection => {
        return {label: selection.name, value: selection};
      });
    });
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  actualizeListOfTagsSelection(selectionIdSelected?: string) {
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      this.selectionOptions = selectionsWithSet.map(selection => {
        return {label: selection.name, value: selection};
      });
      let tagSelectionSelected;
      if (this.selectionOptions.length !== 0) {
        if (selectionIdSelected) {
          const optionSelected = this.selectionOptions.find(s => s.value.name === selectionIdSelected);
          if (optionSelected) {
            tagSelectionSelected = optionSelected.value;
          } else {
            tagSelectionSelected = this.selectionOptions[0].value;
          }
        } else {
          tagSelectionSelected = this.selectionOptions[0].value;
        }
      } else {
        tagSelectionSelected = null;
      }
      this.tagSelectionChange.emit(tagSelectionSelected);
    });
  }

  onSelectionSubmitted(selectionModif: IModification<TagsSelection>) {
    this.selectionService.save(new TagsSelectionArray(selectionModif.item), selectionModif.item.getId()).pipe(
      tap(selection => {
        this.actualizeListOfTagsSelection(selection.name);
        this.closeDialog();
      })
    ).subscribe();
  }

  update(selection: TagsSelection) {
    this.selectionService.update(new TagsSelectionArray(selection), selection.getId())
      .subscribe(updated => {
        this.actualizeListOfTagsSelection(updated.name);
    });
  }

  delete(selection: TagsSelection) {
    const msg = `Delete selection of tags ${selection.name} (${selection.description}) ?`;
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: this.CANCEL_MSG,
      acceptLabel: this.REMOVE_SELECTION_MSG,
      accept: () => {
        this.selectionService.delete(selection.getId())
          .subscribe(deletedSelection => {
            this.actualizeListOfTagsSelection();
          });
      },
      reject: () => { }
    });
  }

  onSelectionChange(event) {
    this.tagSelectionChange.emit(event.value);
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
