import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

import { ProfilService } from '../../../profil/profil.service';

import { TagsSelection } from '../Selection';
import { SelectionService } from '../selection.service';
import { QuestionBase } from '../../../shared/dynamic-form/question-base';
import { QuestionControlService } from '../../../shared/dynamic-form/question-control.service';
import { TextboxQuestion } from '../../../shared/dynamic-form/question-textbox';
import { SelectionFormComponent } from '../selection-form/selection-form.component';

@Component({
  selector: 'app-selection-dashboard',
  templateUrl: './selection-dashboard.component.html',
  styleUrls: ['./selection-dashboard.component.css']
})
export class SelectionDashboardComponent implements OnInit {

  selectionOptions: SelectItem[];
  currentSelection: TagsSelection; // in milli

  display = false;
  selectionQuestions: QuestionBase<any>[];
  selectionOfTagsInForm: TagsSelection;

  @ViewChild(SelectionFormComponent) private tagSelectionFormComp: SelectionFormComponent;

  constructor(private profilService: ProfilService,
              // private tagService: TagHistorianService,
              private selectionService: SelectionService) {}

  ngOnInit() {
    this.selectionQuestions = this.getMyQuestions();
    this.selectionOfTagsInForm = new TagsSelection({id: 'new selection', tagsId: []});
    this.currentSelection = this.profilService.currentTagsSelection;
    this.actualizeListOfTagsSelection();
  }

  onSelectionChange(event) {
    this.currentSelection = event.value;
  }

  showDialog() {
      this.display = true;
  }

  onCreated(selection: TagsSelection) {
    this.selectionOfTagsInForm = new TagsSelection({id: 'new selection', tagsId: []});
    this.currentSelection = selection;
    this.actualizeListOfTagsSelection();
  }

  actualizeListOfTagsSelection() {
    this.selectionService.getAll().subscribe(selections => {
      this.selectionOptions = selections.map(selection => {
        return {label: selection.id, value: selection};
      });
    });
  }

  private getMyQuestions(): QuestionBase<any>[]  {

    const questions: QuestionBase<any>[] = [

      new TextboxQuestion({
        key: 'id',
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
