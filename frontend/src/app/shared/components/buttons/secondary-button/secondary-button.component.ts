import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {BtnLabel} from "../interfaces/btn.label";

@Component({
  selector: "app-secondary-button",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./secondary-button.component.html",
  styleUrls: ["./secondary-button.component.scss"]
})
export class SecondaryButtonComponent implements BtnLabel {
  @Input({required: true}) label!: string;
  @Input({required: false}) redirectRoute!: string;
}
