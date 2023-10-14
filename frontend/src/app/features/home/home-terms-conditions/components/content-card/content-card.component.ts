import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: "app-content-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-card">
      <h6>{{title}}</h6>
      <p class="content-card__content">{{body}}</p>
    </div>
  `,
  styleUrls: ["./content-card.component.scss"]
})
export class ContentCardComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) body!: string;
}
