import { Injectable, OnDestroy } from '@angular/core';

import { TagsSelection } from '../modules/selection/Selection';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IHistorianTag } from '../modules/tag/modele/HistorianTag';
import { TagHistorianService } from '../modules/tag/service/tag-historian.service';

export interface TagsSelectionEnriched {
  selection: TagsSelection;
  tags: IHistorianTag[];
}

@Injectable()
export class ProfilService implements OnDestroy {

  helpHidden = true;
  displayTagManagement = false;
  private _currentTagsSelection: TagsSelection;

  private changeSelectionSubsrciption: Subscription;
  private changeSelections: BehaviorSubject<TagsSelectionEnriched>;
  private addTagToSelection = new Subject<IHistorianTag>();
  private removeTagToSelection = new Subject<IHistorianTag>();

  get currentTagsSelection(): TagsSelection {
    return this._currentTagsSelection;
  }

  set currentTagsSelection(selection: TagsSelection) {
    this.changeSelection(selection);
  }

  constructor(private tagService: TagHistorianService) {

    this.changeSelections = new BehaviorSubject<TagsSelectionEnriched>({
      selection: null,
      tags: []
    });
    this.changeSelectionSubsrciption = this.changeSelections.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(400),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      tap(selection => this._currentTagsSelection = selection.selection),
    ).subscribe();
  }

  ngOnDestroy() {
    this.changeSelectionSubsrciption.unsubscribe();
    this.changeSelections.unsubscribe();
    this.addTagToSelection.unsubscribe();
    this.removeTagToSelection.unsubscribe();
  }

  private changeSelection(selection: TagsSelection) {
    if (selection) {
      this.tagService.getAllWithIds(selection.tagIdsArray).subscribe(tags => {
        this.changeSelections.next({
          selection: selection,
          tags: tags
        });
      });
    }
  }

  addTag(tag: IHistorianTag) {
    this.addTagToSelection.next(tag);
  }

  removeTag(tag: IHistorianTag) {
    this.removeTagToSelection.next(tag);
  }

  getSelectionPublisher(): Subject<TagsSelectionEnriched> {
    return this.changeSelections;
  }

  getAddTagPublisher(): Subject<IHistorianTag> {
    return this.addTagToSelection;
  }

  getRemoveTagPublisher(): Subject<IHistorianTag> {
    return this.removeTagToSelection;
  }

  isHelpHidden(): boolean {
    return this.helpHidden;
  }

  toggleHelp(): void {
      this.helpHidden = !this.helpHidden;
  }

  showDialogTagManagement(): void {
    this.displayTagManagement = true;
  }
}
