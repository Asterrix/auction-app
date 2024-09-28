import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

export enum CheckboxShape {
  Round,
  Square
}

@Component({
  selector: "app-checkbox",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"]
})
export class CheckboxComponent {
  @Input({required: true}) isActive!: boolean;
  @Input({required: true}) shape!: CheckboxShape;
  protected readonly CheckboxShape = CheckboxShape;
}
