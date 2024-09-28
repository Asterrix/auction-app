import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from "@angular/core";
import {ItemLayout} from "./item.layout.type";

@Directive({
  selector: "[itemLayout]",
  standalone: true
})
export class ItemLayoutDirective implements OnInit, OnChanges {
  @Input({required: true}) layout!: ItemLayout;
  private readonly classPrefix: string = "layout";

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.applyLayoutClass(this.layout);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["layout"]) {
      this.applyLayoutClass(this.layout);
    }
  }

  private applyLayoutClass(layout: ItemLayout): void {
    if (layout === "grid") {
      this.renderer.removeClass(this.elementRef.nativeElement, `${this.classPrefix}--list`);
      this.renderer.addClass(this.elementRef.nativeElement, `${this.classPrefix}--grid`);
    } else if (layout === "list") {
      this.renderer.removeClass(this.elementRef.nativeElement, `${this.classPrefix}--grid`);
      this.renderer.addClass(this.elementRef.nativeElement, `${this.classPrefix}--list`);
    }

    const className: string = `${this.classPrefix}--${layout}`;
    this.renderer.addClass(this.elementRef.nativeElement, className);
  }
}
