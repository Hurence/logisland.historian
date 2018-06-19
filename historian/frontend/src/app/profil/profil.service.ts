import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilities } from '../shared/utilities.service';
import { SelectionService } from '../modules/selection/selection.service';
import { TagsSelection } from '../modules/selection/Selection';


@Injectable()
export class ProfilService {

  helpHidden = true;
  currentTagsSelection: TagsSelection;

  constructor() { this.currentTagsSelection = this.getDefautSelection(); }

  isHelpHidden(): boolean {
    return this.helpHidden;
  }

  toggleHelp(): void {
      this.helpHidden = !this.helpHidden;
  }

  private getDefautSelection(): TagsSelection {
    return new TagsSelection({
      id: 'default',
      name: 'default selection',
      tagsId: [],
    });
  }
}
