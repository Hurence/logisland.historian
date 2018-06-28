import { Injectable } from '@angular/core';

import { TagsSelection } from '../modules/selection/Selection';


@Injectable()
export class ProfilService {

  helpHidden = true;
  currentTagsSelection: TagsSelection;
  private defautSelection = new TagsSelection({
    name: 'default selection',
    tagIds: new Set(),
  });

  constructor() { this.currentTagsSelection = this.getDefautSelection(); }

  isHelpHidden(): boolean {
    return this.helpHidden;
  }

  toggleHelp(): void {
      this.helpHidden = !this.helpHidden;
  }

 getDefautSelection(): TagsSelection {
    return this.defautSelection;
  }
}
