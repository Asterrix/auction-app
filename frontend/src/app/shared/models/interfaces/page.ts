/* Represents json response provided by Spring Boot Page<T> interface */
export interface Page<T> {
  content: T[];         // The list of data items on the current page.
  pageable: {
    sort: {
      sorted: boolean;  // Indicates if sorting is applied.
      unsorted: boolean; // Indicates if sorting is not applied.
      empty: boolean;    // Indicates if the sort is empty.
    };
    offset: number;     // The current page offset.
    pageNumber: number;  // The current page number (0-based).
    pageSize: number;    // The number of items per page.
    unpaged: boolean;   // Indicates if the page is unpaged.
    paged: boolean;     // Indicates if the page is paged.
  };
  totalPages: number;    // The total number of pages.
  totalElements: number; // The total number of elements across all pages.
  last: boolean;        // Indicates if this is the last page.
  size: number;         // The number of items on the current page.
  number: number;       // The current page number (1-based).
  sort: {
    sorted: boolean;    // Indicates if sorting is applied.
    unsorted: boolean;   // Indicates if sorting is not applied.
    empty: boolean;      // Indicates if the sort is empty.
  };
  first: boolean;        // Indicates if this is the first page.
  numberOfElements: number; // The number of elements on the current page.
  empty: boolean;        // Indicates if the page is empty.
}
