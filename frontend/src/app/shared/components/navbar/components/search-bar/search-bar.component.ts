import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
      <form class="search-bar">
          <input type="text" placeholder="Try enter: Shoes">
          <img ngSrc="assets/icons/mdi-light_magnify.svg" alt="Search icon" height="24" width="24"/>
      </form>
  `,
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

}
