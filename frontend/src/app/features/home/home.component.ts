import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeHeaderComponent} from "./home-header/home-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
