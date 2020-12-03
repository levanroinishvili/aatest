import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, startWith } from 'rxjs/operators';
import { switchMap, takeUntil } from 'rxjs/operators';

import { MoviesService } from './movies.service';
import { Query } from './movies.service.interface';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  unsubscribeAll = new Subject<void>();

  newSearchTerm$ = new Subject<string>(); // Emits new search terms
  newSearchQuery$: Observable<Query> = this.newSearchTerm$.pipe(
    map(searchTerm => ({
      search: searchTerm,
      page: 1
    }))
  );
  paginationQuery$ = new Subject<Query>(); // Emits pagination queries, for next and prev pages of old search term
  cancelSearch$ = new Subject<void>(); // Emits when current search needs to be canceled due to user entering new invalid term

  searchQuery$: Observable<Query> = merge(
    this.newSearchQuery$,
    this.paginationQuery$
  );

  searchResults$ = this.searchQuery$.pipe(
    switchMap(query => this.movies.search(query).pipe( // New valid search will automatically cancel previous search
      map(result => ({type: 'result' as 'result', data: result})),
      startWith({type: 'loading' as 'loading', data: null}),
      catchError((error: HttpErrorResponse | Error) => of({type: 'error' as 'error', data: error})),
      // Show loading after delay, but results and error instantly
      switchMap(result => result.type === 'loading' ? of(result).pipe(delay(500)) : of(result)),
      takeUntil(this.cancelSearch$) // Manually cancel previous search, if new search is invalid
    )),
    takeUntil(this.unsubscribeAll)
  );

  constructor(
    private movies: MoviesService
  ) { }

  search(searchTerm: string): void {
    console.log(searchTerm);
    if ( searchTerm === null ) {
      this.cancelSearch$.next();
    } else {
      this.newSearchTerm$.next(searchTerm);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
