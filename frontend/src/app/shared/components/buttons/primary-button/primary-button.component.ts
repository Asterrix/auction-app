import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {BtnLabel} from "../interfaces/btn.label";

@Component({
  selector: "button-primary",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./primary-button.component.html",
  styleUrls: ["./primary-button.component.scss"]
})
export class PrimaryButtonComponent implements BtnLabel {
  @Input({required: true})
  label!: string;
}
