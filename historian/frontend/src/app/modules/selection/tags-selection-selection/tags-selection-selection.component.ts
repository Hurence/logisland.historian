import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TagsSelection } from '../Selection';
import { SelectionService } from '../selection.service';
import { ProfilService } from '../../../profil/profil.service';

@Component({
  selector: 'app-tags-selection-selection',
  templateUrl: './tags-selection-selection.component.html',
  styleUrls: ['./tags-selection-selection.component.css']
})
export class TagsSelectionSelectionComponent implements OnInit {

  selectionOptions: SelectItem[];
  private _tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();
  displayTagManagement: boolean = false;


  constructor(private selectionService: SelectionService,
    private profilService: ProfilService) { }

  get tagSelection(): TagsSelection {
    return this._tagSelection;
  }

  set tagSelection(newVal: TagsSelection) {
    // console.log(`SELECTION_SELECTION set selection`);
    this._tagSelection = newVal;
    this.tagSelectionChange.emit(this._tagSelection);
  }

  ngOnInit() {
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      this.selectionOptions = selectionsWithSet.map(selection => {
        return {label: selection.name, value: selection};
      });
      if (this.selectionOptions.length !== 0) {
        if (this.profilService.currentTagsSelection) {
          const selectionSelected = this.selectionOptions.find(option => {
            return option.value.name === this.profilService.currentTagsSelection.name &&
              option.value.owner === this.profilService.currentTagsSelection.owner;
          });
          if (selectionSelected) {
            this._tagSelection = selectionSelected.value;
          } else {
            this._tagSelection = this.selectionOptions[0].value;
            this.profilService.currentTagsSelection = this._tagSelection;
          }
        } else {
          this._tagSelection = this.selectionOptions[0].value;
          this.profilService.currentTagsSelection = this._tagSelection;
        }
      }
    });
  }

  showDialogTagManagement() {
    this.displayTagManagement = true;
  }
}
