import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "add-item-basic-form-text-area",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./form-text-area.component.html",
  styleUrl: "./form-text-area.component.scss"
})
export class FormTextAreaComponent {
  protected textInput: string = "";
  protected wordCount: number = 100;
  protected characterCount: number = 700;

  public updateCounts(): void {
    const words: string[] = this.textInput.split(/\s+/);
    this.wordCount = words.length === 1 && words[0] === "" ? 0 : words.length;

    this.characterCount = this.textInput.length;
  }
}
