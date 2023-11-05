import {BehaviorSubject, Observable} from "rxjs";

export interface IPagination {
  page: number;
  size: number;
}

export class Pagination {
  private base: Required<IPagination>;
  private isLastPage = new BehaviorSubject(true);
  isLast$: Observable<boolean> = this.isLastPage.asObservable();
  private totalElements = new BehaviorSubject(0);
  totalElements$ = this.totalElements.asObservable();

  constructor(pagination: Required<IPagination>) {
    this.base = pagination;
  }

  getPagination(): Required<IPagination> {
    return this.base;
  }

  isLastPageValue(): boolean {
    return this.isLastPage.getValue();
  }

  increasePageNumber(): void {
    this.base.page++;
  }

  resetPageNumber(): void {
    this.base.page = 0;
  }

  updatePaginationDetails(last: boolean | undefined, totalElements: number | undefined): void {
    this.updateIsLastPage(last);
    this.updateTotalElements(totalElements);
  }

  private updateIsLastPage(last: boolean | undefined): void {
    this.isLastPage.next(last ?? true);
  }

  private updateTotalElements(totalElements: number | undefined): void {
    this.totalElements.next(totalElements ?? 0);
  }
}
