import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeHeaderSidebarComponent} from "./components/home-header-sidebar/home-header-sidebar.component";
import {HomeHeaderHighlightComponent} from "./components/home-header-highlight/home-header-highlight.component";

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [CommonModule, HomeHeaderSidebarComponent, HomeHeaderHighlightComponent],
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {

}
