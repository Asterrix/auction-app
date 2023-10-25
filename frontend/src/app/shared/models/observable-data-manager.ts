import {BehaviorSubject, Observable} from "rxjs";
import {catchError, finalize, take} from "rxjs/operators";

export class ObservableDataManager<T> {
  private dataSubject = new BehaviorSubject<T | undefined>(undefined);
  data$ = this.dataSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private hasErrorSubject = new BehaviorSubject<boolean>(false);
  hasError$ = this.hasErrorSubject.asObservable();

  load(action$: Observable<T>): void {
    this.isLoadingSubject.next(true);
    this.hasErrorSubject.next(false);

    action$
      .pipe(
        take(1),
        catchError((error) => {
          this.dataSubject.next(undefined);
          this.hasErrorSubject.next(true);
          return [];
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe((data: T) => {
        this.dataSubject.next(data);
      });
  }

  unsubscribe(): void {
    this.dataSubject.complete();
    this.isLoadingSubject.complete();
    this.hasErrorSubject.complete();
  }
}
