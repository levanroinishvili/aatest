export interface MovieRaw {
    imdbID: string;
    Title: string;
    Type: string;
    Poster: string;
    Year: string;
}

export interface Movie {
    id: string;
    title: string;
    type: string;
    poster: string;
    year: number;
}

export interface Query {
    search: string;
    page: number;
}

export type OmdbResult<DataType = any> = OmdbData<DataType> | OmdbError;

export interface OmdbError {
    Response: 'False';
    Error: string;
}

export interface OmdbData<DataType = any> {
    Response: 'True';
    totalResults: string; // It is 'actually' a number, returned as a string. E.g. "32"
    Search: DataType[];
}

export interface Paged<T = any> {
    first: Query | null; // Query for the first page or null - if the first page does not exist
    prev: Query | null; // Query for the next page or null - if the next page does not exist
    next: Query | null; // Query for the prev page or null - if the prev page does not exist
    last: Query | null; // Query for the next page or null - if the next page does not exist
    page: number; // Current page
    records: T[];
}
