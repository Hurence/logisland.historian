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

  // dropdown select current selection of tags
  private _selectionOptions: SelectItem[];
  @Output() selectionOptionsChange = new EventEmitter<SelectItem[]>();
  private _tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();
  // Form to add new selection of tags
  display = false;
  selectionQuestions: QuestionBase<any>[];
  selectionOfTagsInForm: TagsSelection;

  private CANCEL_MSG = 'Cancel';
  private REMOVE_SELECTION_MSG = 'Remove selection of tags';

  @ViewChild(SelectionFormComponent) private tagSelectionFormComp: SelectionFormComponent;

  @Input()
  get tagSelection(): TagsSelection {
    return this._tagSelection;
  }

  set tagSelection(newVal: TagsSelection) {
    console.log(`SELECTION_DASHBORD set selection`);
    this._tagSelection = newVal;
  }

  @Input()
  get selectionOptions(): SelectItem[] {
    return this._selectionOptions;
  }

  set selectionOptions(newVal: SelectItem[]) {
    this._selectionOptions = newVal;
    this.selectionOptionsChange.emit(this._selectionOptions);
  }

  constructor(private confirmationService: ConfirmationService,
              private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectionQuestions = this.getMyQuestions();
    this.selectionOfTagsInForm = new TagsSelection({name: '', tagIds: new Set()});
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  actualizeListOfTagsSelection(selectedSelection: TagsSelection) {
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      this.selectionOptions = selectionsWithSet.map(selection => {
        return {label: selection.name, value: selection};
      });
      if (this.selectionOptions.length !== 0) {
        if (selectedSelection) {
          const optionSelected = this.selectionOptions.find(s => s.value.name === selectedSelection.name);
          if (optionSelected) {
            this.tagSelectionChange.emit(optionSelected.value);
          } else {
            this.tagSelectionChange.emit(this.selectionOptions[0].value);
          }
        } else {
          this.tagSelectionChange.emit(this.selectionOptions[0].value);
        }
      } else {
        this.tagSelectionChange.emit(null);
      }
    });
  }

  onSelectionSubmitted(selectionModif: IModification<TagsSelection>) {
    this.selectionService.save(new TagsSelectionArray(selectionModif.item), selectionModif.item.getId()).pipe(
      tap(selection => {
        this.selectionOfTagsInForm = new TagsSelection({name: '', tagIds: new Set()});
        this.tagSelection = new TagsSelection(selection);
        this.actualizeListOfTagsSelection(this.tagSelection);
        this.closeDialog();
      })
    ).subscribe();
  }

  update(selection: TagsSelection) {
    this.selectionService.update(new TagsSelectionArray(selection), selection.getId())
      .subscribe(updated => {
        this.actualizeListOfTagsSelection(this.tagSelection);
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
            this.actualizeListOfTagsSelection(this.tagSelection);
          });
      },
      reject: () => { }
    });
  }

  onSelectionChange(event) {
    // console.log(`SELECTION_DASHBOARD dropdown change`);
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
