import {CommonModule} from "@angular/common";
import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./progress-bar.component.html",
  styleUrl: "./progress-bar.component.scss"
})
export class ProgressBarComponent implements OnInit {
  @Input({required: true}) currentProgress!: number;
  @Input({required: true}) totalProgress!: number;
  protected number: number[] = [];

  public ngOnInit(): void {
    this.number = Array.from({length: this.totalProgress}, (_, index) => index);
  }
}
