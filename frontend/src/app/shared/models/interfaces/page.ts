/* Represents json response provided by Spring Boot Page<T> interface */
export interface Page<T> {
  content: T[];         // The list of data items on the current page.
  totalElements: number; // The total number of elements across all pages.
  last: boolean;        // Indicates if this is the last page.
  size: number;         // The number of items on the current page.
}
