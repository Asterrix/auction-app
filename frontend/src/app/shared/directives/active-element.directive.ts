import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from "@angular/core";

@Directive({
  selector: "[activeElement]",
  standalone: true
})
export class ActiveElementDirective implements OnChanges {
  @Input({required: true}) isActive!: boolean;
  @Input({required: true}) activeClass!: string;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["isActive"]) {
      if (this.isActive) {
        this.renderer.addClass(this.elementRef.nativeElement, this.activeClass);
      } else if (!this.isActive) {
        this.renderer.removeClass(this.elementRef.nativeElement, this.activeClass);
      }
    }
  }
}
