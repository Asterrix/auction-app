import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-form-member",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./form-member.component.html",
  styleUrl: "./form-member.component.scss"
})
export class FormMemberComponent {
  @Input({required: true}) memberLabel!: string;
  @Input({required: true}) memberId!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) inputType!: string;
}
