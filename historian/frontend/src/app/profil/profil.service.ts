import { Injectable } from '@angular/core';

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
      id: 'default selection',
      tagsId: [],
    });
  }
}
