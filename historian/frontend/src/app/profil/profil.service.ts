import { Injectable, OnDestroy } from '@angular/core';

import { TagsSelection } from '../modules/selection/Selection';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IHistorianTag } from '../modules/tag/modele/HistorianTag';


@Injectable()
export class ProfilService implements OnDestroy {

  helpHidden = true;
  currentTagsSelection: TagsSelection;

  private changeSelectionSubsrciption: Subscription;
  private changeSelections: BehaviorSubject<TagsSelection>;
  private addTagToSelection = new Subject<IHistorianTag>();
  private removeTagToSelection = new Subject<IHistorianTag>();

  private defautSelection = new TagsSelection({
    name: 'default selection',
    tagIds: new Set(),
  });

  constructor() {
    this.currentTagsSelection = this.getDefautSelection();
    this.changeSelections = new BehaviorSubject<TagsSelection>(this.getDefautSelection());
    this.changeSelectionSubsrciption = this.changeSelections.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(400),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      tap(selection => this.currentTagsSelection = selection),
    ).subscribe();
  }

  ngOnDestroy() {
    this.changeSelectionSubsrciption.unsubscribe();
    this.changeSelections.unsubscribe();
    this.addTagToSelection.unsubscribe();
    this.removeTagToSelection.unsubscribe();
  }

  changeSelection(selection: TagsSelection) {
    this.changeSelections.next(selection);
  }

  addTag(tag: IHistorianTag) {
    this.addTagToSelection.next(tag);
  }

  removeTag(tag: IHistorianTag) {
    this.removeTagToSelection.next(tag);
  }

  getSelectionPublisher(): Subject<TagsSelection> {
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

  getDefautSelection(): TagsSelection {
    return this.defautSelection;
  }
}
