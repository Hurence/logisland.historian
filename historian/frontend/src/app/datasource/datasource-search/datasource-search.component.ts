import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-datasource-search',
  templateUrl: './datasource-search.component.html',
  styleUrls: ['./datasource-search.component.css']
})
export class DatasourceSearchComponent implements OnInit {


  @Output() queryString = new EventEmitter<string>();
  private filterString: string;
  private searchTerms = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(400),
      // ignore new term if same as previous term
      distinctUntilChanged(),
       // switch to new search observable each time the term changes
       switchMap(
        (term: string) => {
          this.queryString.emit(term)
          return term;
        }
      ),
    ).subscribe(t => console.debug('typed "' + t + '" in search'));
  }
  
  update(term: string): void {
    this.searchTerms.next(term);
    this.filterString = term;
  }
}
