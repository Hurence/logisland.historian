import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProfilService } from '../../../profil/profil.service';
import { SelectItem } from 'primeng/api';
import { TagsSelection } from '../Selection';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-tags-selection-selection',
  templateUrl: './tags-selection-selection.component.html',
  styleUrls: ['./tags-selection-selection.component.css']
})
export class TagsSelectionSelectionComponent implements OnInit {

  selectionOptions: SelectItem[];
  private _tagSelection: TagsSelection;
  @Output() tagSelectionChange = new EventEmitter<TagsSelection>();

  constructor(private selectionService: SelectionService,
              public profilService: ProfilService) { }

  @Input()
  get tagSelection(): TagsSelection {
    return this._tagSelection;
  }

  set tagSelection(newVal: TagsSelection) {
    this._tagSelection = newVal;
    this.tagSelectionChange.emit(this._tagSelection);
  }

  ngOnInit() {
    this.selectionService.getAll().subscribe(selections => {
      const selectionsWithSet = selections.map(s => new TagsSelection(s));
      selectionsWithSet.push(this.profilService.getDefautSelection());
      this.selectionOptions = selectionsWithSet.map(selection => {
        return {label: selection.name, value: selection};
      });
    });
  }
}
