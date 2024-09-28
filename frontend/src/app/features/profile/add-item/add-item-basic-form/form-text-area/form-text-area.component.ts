import {CommonModule} from "@angular/common";
import {Component, Input} from "@angular/core";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "add-item-basic-form-text-area",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./form-text-area.component.html",
  styleUrl: "./form-text-area.component.scss"
})
export class FormTextAreaComponent {
  @Input({required: true}) controlGroup!: FormGroup;
  @Input({required: true}) controlName!: string;
  @Input({required: true}) valid!: boolean;
  protected wordCount: number = 100;
  protected characterCount: number = 700;

  protected updateCounts(): void {
    const words: string[] = this.controlGroup.get(this.controlName)?.value.split(/\s+/);
    this.wordCount = words.length === 1 && words[0] === "" ? 0 : words.length;

    this.characterCount = this.controlGroup.get(this.controlName)?.value.length;
  }
}
