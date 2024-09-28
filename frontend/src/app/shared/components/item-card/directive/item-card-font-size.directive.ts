import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from "@angular/core";
import {ItemLayout} from "./item.layout.type";

@Directive({
  selector: "[itemCardFontSize]",
  standalone: true
})
export class ItemCardFontSizeDirective implements OnChanges {
  @Input({required: true}) cardLayout!: ItemLayout;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["cardLayout"]) {
      const fontSize: string = this.cardLayout === "list" ? "1.8rem" : "1.6rem";

      this.renderer.setStyle(this.elementRef.nativeElement, "font-size", fontSize);
    }
  }
}
