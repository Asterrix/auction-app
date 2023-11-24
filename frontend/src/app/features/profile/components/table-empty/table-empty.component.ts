import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  SecondaryButtonComponent
} from "../../../../shared/components/buttons/secondary-button/secondary-button.component";

@Component({
  selector: "profile-table-empty",
  standalone: true,
  imports: [CommonModule, SecondaryButtonComponent],
  templateUrl: "./table-empty.component.html",
  styleUrls: ["./table-empty.component.scss"]
})
export class TableEmptyComponent {
  @Input({required: true})
  iconPath!: string;

  @Input({required: true})
  iconName!: string;

  @Input({required: true})
  message!: string;

  @Input({required: true})
  btnLabel!: string;
}
