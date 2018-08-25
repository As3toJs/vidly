import { take } from 'ramda';

export function paginate(moviesList, pageNumber, PageSize) {
    // Get the start index of page
    const startIndex = (pageNumber - 1) * PageSize;
    // Get the movie list from the startIndex
    const list = moviesList.slice(startIndex);
    // Return the list of pageSize
    return take(PageSize, list);
}