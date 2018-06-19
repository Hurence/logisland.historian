import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { TagHistorianService } from '../../tag/service/tag-historian.service';
import { DatasetService } from '../../../dataset/dataset.service';
import { SelectionService } from '../selection.service';
import { ProfilService } from '../../../profil/profil.service';
import { TagsSelection } from '../Selection';

@Component({
  selector: 'app-selection-dashboard',
  templateUrl: './selection-dashboard.component.html',
  styleUrls: ['./selection-dashboard.component.css']
})
export class SelectionDashboardComponent implements OnInit {

  selectionOptions: SelectItem[];
  currentSelection: TagsSelection; // in milli

  constructor(private profilService: ProfilService,
              // private tagService: TagHistorianService,
              private selectionService: SelectionService) { }

  ngOnInit() {
    this.currentSelection = this.profilService.currentTagsSelection;
    this.selectionService.getAll().subscribe(selections => {
      this.selectionOptions = selections.map(selection => {
        return {label: selection.name, value: selection};
      });
    });
  }

  onSelectionChange(event) {
    this.currentSelection = event.value;
  }

}
