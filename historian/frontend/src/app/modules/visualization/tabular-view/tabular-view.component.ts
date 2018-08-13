import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../../../profil/profil.service';
import { TagsSelection } from '../../selection/Selection';

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent implements OnInit {

  refreshRate: number = 10000;

  constructor(public profilService: ProfilService) { }

  ngOnInit() {
  }

  onSelectionChanged(selection: TagsSelection) {
    this.profilService.currentTagsSelection = selection;
  }
}
