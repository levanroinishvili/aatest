import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OmdbResult, MovieRaw, Movie, Paged, Query } from './movies.service.interface';
import { API_URL, BASE_PARAMS, PAGE_SIZE } from './movies.service.config';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private normalize(movie: MovieRaw): Movie {
    return {
      id: movie.imdbID,
      type: movie.Type,
      title: movie.Title,
      poster: movie.Poster,
      year: parseInt(movie.Year, 10)
    };
  }

  private paged(search: string, rawMovies: MovieRaw[], page: number, totalRecords: number): Paged<Movie> {

    const hasPrevious = 1 < page;
    const hasNext = PAGE_SIZE * (page - 1) + rawMovies.length < totalRecords;

    return {
      first: hasPrevious ? { search, page: 1 } : null,
      prev: hasPrevious ? { search, page: page - 1 } : null,
      next: hasNext ? { search, page: page + 1 } : null,
      last: hasNext ? { search, page: Math.ceil(totalRecords / PAGE_SIZE) } : null,
      page,
      records: rawMovies.map(this.normalize)
    };
  }

  /** Search Open Movie Database with a search term
   * @param s search term to search
   */
  search(query: Query): Observable<Paged<Movie>> {

    const searchTerm = query.search;
    const page = query.page ?? 1;

    const httpParams = Object.assign(BASE_PARAMS, {
      s: searchTerm,
      page
    });

    return this.httpClient.get<OmdbResult<MovieRaw>>(
      API_URL,
      { params: httpParams }
    ).pipe(
      map(omdbResult => {
        if ( omdbResult.Response === 'True') {
          return this.paged(searchTerm, omdbResult.Search, page, parseInt(omdbResult.totalResults, 10));
        } else {
          throw new Error(omdbResult.Error); // Convert into error
        }
      })
    );
  }
}
