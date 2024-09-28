import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeHeaderComponent} from "./home-header/home-header.component";
import {HomeItemsComponent} from "./home-items/home-items.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HomeItemsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
