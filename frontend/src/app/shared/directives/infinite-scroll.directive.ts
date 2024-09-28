import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";

@Directive({
  selector: "[infiniteScroll]",
  standalone: true
})
export class InfiniteScrollDirective implements OnInit {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  threshold: number = 320;
  @Input({required: true}) endReached: boolean = false;
  private window!: Window;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.window = window;
  }

  @HostListener("window:scroll", ["$event.target"])
  windowScrollEvent(): void {
    if (this.endReached) {
      return;
    }

    const heightOfWholePage: number = this.window.document.documentElement.scrollHeight;
    const scrollToBottom: number = this.calculateDistanceToBottomOfPage(heightOfWholePage);

    if (scrollToBottom < this.threshold) {
      this.emitNearEndEvent();
    }
  }

  private calculateDistanceToBottomOfPage(wholePageHeight: number): number {
    const heightOfElement: number = this.el.nativeElement.scrollHeight;
    const currentScrolledY: number = this.window.scrollY;
    const innerHeight: number = this.window.innerHeight;

    return heightOfElement - innerHeight - currentScrolledY + wholePageHeight - heightOfElement;
  }

  private emitNearEndEvent(): void {
    this.nearEnd.emit();
  }
}
