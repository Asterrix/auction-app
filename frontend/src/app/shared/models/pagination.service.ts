import {computed, Inject, Injectable, signal, WritableSignal} from "@angular/core";

export type Pageable = {
  page: number;
  size: number;
}

export type Pagination = {
  isLastPage: boolean;
  totalElements: number;
}

export type Page = Pageable & Pagination;

@Injectable({
  providedIn: "root"
})
export class PaginationService {
  private paginationSignal: WritableSignal<Page>;
  public pagination = computed(() => this.paginationSignal());

  constructor(@Inject("pageable") pageable: Pageable) {
    this.paginationSignal = signal({
      page: pageable.page,
      size: pageable.size,
      isLastPage: true,
      totalElements: 0
    });
  }

  public increasePageNumber(): void {
    if (!this.paginationSignal().isLastPage) {
      this.paginationSignal.update((page: Page) => {
        page.page++;
        return page;
      });
    }
  }

  public resetPagination(): void {
    this.paginationSignal.update((page: Page) => {
      page.page = 0;
      page.totalElements = 0;
      page.isLastPage = true;
      return page;
    });
  }

  public updatePaginationDetails(last: boolean, totalElements: number): void {
    this.updateIsLastPage(last);
    this.updateTotalElements(totalElements);
  }

  private updateIsLastPage(last: boolean): void {
    this.paginationSignal.update((page: Page) => {
      page.isLastPage = last;
      return page;
    });
  }

  private updateTotalElements(totalElements: number): void {
    this.paginationSignal.update((page: Page) => {
      page.totalElements = totalElements;
      return page;
    });
  }
}
