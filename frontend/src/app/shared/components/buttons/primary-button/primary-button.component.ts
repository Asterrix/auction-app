import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "button-primary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./primary-button.component.html",
  styleUrls: ["./primary-button.component.scss"]
})
export class PrimaryButtonComponent {
  @Input({required: true}) label!: string;
}
