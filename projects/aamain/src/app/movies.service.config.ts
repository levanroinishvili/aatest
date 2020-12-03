export const API_URL = 'http://www.omdbapi.com';

export const BASE_PARAMS = {
    apikey: 'b2cf7671',
    r: 'json',
    plot: 'full', // 'short'
    page: '1',
    s: 'a',
};

export const PAGE_SIZE = 10; // This should match the actual page size of records returned by the OMDB Api
