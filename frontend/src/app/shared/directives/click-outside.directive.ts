import {DOCUMENT} from "@angular/common";
import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output} from "@angular/core";
import {filter, fromEvent, Subscription} from "rxjs";

@Directive({
  selector: "[clickOutside]",
  standalone: true
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();
  private documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) {
  }

  public ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, "click").pipe(
      filter((event: Event) => !this.isInside(event.target as HTMLElement))
    ).subscribe((): void => {
      this.clickOutside.emit();
    });
  }

  public ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  private isInside(target: HTMLElement): boolean {
    return this.element.nativeElement.contains(target);
  }
}
