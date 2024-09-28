import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmptyValue} from "../../../../shared/models/enums/EmptyValue";

@Component({
  selector: "app-content-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "content-card.component.html",
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input({required: true}) title: string = EmptyValue.String;
  @Input({required: true}) body: string = EmptyValue.String;
  protected readonly EmptyValue = EmptyValue;
}
