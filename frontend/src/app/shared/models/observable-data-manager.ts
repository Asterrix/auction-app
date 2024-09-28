import {BehaviorSubject, Observable} from "rxjs";
import {catchError, finalize, take} from "rxjs/operators";


/*
This is a generic class used for managing and observing data in "rxjs" observable manner.
It holds two properties:
  - BehaviourSubject - holds the data.
  - Subject$ observable - exposes the data to an observable stream.
*/
export class ObservableDataManager<T> {
  private dataSubject: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  data$: Observable<T | undefined> = this.dataSubject.asObservable();
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  private hasErrorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasError$: Observable<boolean> = this.hasErrorSubject.asObservable();

  /**
   * Loads data into the service and updates its internal state based on the provided action$ observable.
   *
   * @param action$ - An observable representing the action or data retrieval operation to be performed.
   * This observable should emit data of type T or an error if encountered.
   *
   * @remarks
   * This method is designed to handle loading and error states for data retrieval operations. It sets the loading
   * state to `true`, clears any previous error state, and listens to the provided `action$` observable. When the
   * first emission is received, it sets the loading state to `false` and updates the internal data state with the
   * emitted data. If an error is encountered during the operation, it sets the error state to `true` and clears the
   * data state.
   *
   * @template T - The type of data to be loaded and emitted by the `action$` observable.
   *
   * @returns void
   */
  load(action$: Observable<T>): void {
    this.isLoadingSubject.next(true);
    this.hasErrorSubject.next(false);

    // TODO: Handle Errors
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

  /**
   * Unsubscribes and completes the underlying subjects used for managing the component's state.
   *
   * @remarks
   * This method is responsible for unsubscribing from and completing the subjects used to manage the
   * component's state, including data, loading, and error state. It should be called when
   * the component or service using these subjects is no longer in use to prevent memory leaks.
   *
   * @returns void
   */
  unsubscribe(): void {
    this.dataSubject.complete();
    this.isLoadingSubject.complete();
    this.hasErrorSubject.complete();
  }
}
