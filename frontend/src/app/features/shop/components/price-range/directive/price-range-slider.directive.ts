import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: "[slider]",
  standalone: true
})
export class PriceRangeSliderDirective implements AfterViewInit {
  @Input() fromSlider!: ElementRef;
  @Input() toSlider!: ElementRef;
  @Input() sliderTrack!: ElementRef;

  private readonly sliderColor: string = "#C6C6C6";
  private readonly rangeColor: string = "#8367D8";

  constructor(private readonly renderer: Renderer2) {
  }

  public ngAfterViewInit(): void {
    this.renderer.listen(this.fromSlider.nativeElement, "input", this.fillSliderTrack);
    this.renderer.listen(this.toSlider.nativeElement, "input", this.fillSliderTrack);
  }

  @HostListener("mousedown", ["$event.target"])
  public onMouseDown(target: HTMLElement): void {
    this.adjustZIndex(target);
  }

  public fillSliderTrack = (): void => {
    const from: number = parseInt(this.fromSlider.nativeElement.value, 10);
    const to: number = parseInt(this.toSlider.nativeElement.value, 10);
    const rangeDistance: number = parseInt(this.toSlider.nativeElement.max) - parseInt(this.fromSlider.nativeElement.min);

    const fromPosition: number = this.calculatePosition(from, this.fromSlider.nativeElement.min, rangeDistance);
    const toPosition: number = this.calculatePosition(to, this.fromSlider.nativeElement.min, rangeDistance);

    const gradient: string = this.createGradient(fromPosition, toPosition);

    this.renderer.setStyle(this.sliderTrack.nativeElement, "background", gradient);
  };

  // Stops the slider from getting stuck when the slider thumbs overlap each other in min/max position
  private adjustZIndex = (target: HTMLElement): void => {
    const isFormSliderActive: boolean = target === this.fromSlider.nativeElement;
    const activeZIndex = 3;
    const inactiveZIndex = 2;

    this.renderer.setStyle(
      this.fromSlider.nativeElement,
      "z-index",
      isFormSliderActive ? activeZIndex : inactiveZIndex
    );

    this.renderer.setStyle(
      this.toSlider.nativeElement,
      "z-index",
      isFormSliderActive ? inactiveZIndex : activeZIndex
    );
  };

  private calculatePosition = (value: number, min: number, rangeDistance: number): number => {
    return ((value - min) / rangeDistance) * 100;
  };

  private createGradient = (fromPosition: number, toPosition: number): string => {
    return `linear-gradient(
    to right,
    ${this.sliderColor} ${fromPosition}%,
    ${this.rangeColor} ${fromPosition}%,
    ${this.rangeColor} ${toPosition}%,
    ${this.sliderColor} ${toPosition}%
  )`;
  };

}
