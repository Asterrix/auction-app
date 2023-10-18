import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-header-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-header-sidebar.component.html',
  styleUrls: ['./home-header-sidebar.component.scss']
})
export class HomeHeaderSidebarComponent {
  categoryList: Array<String> = new Array<String>(
    "Fashion",
    "Accessories",
    "Jewelry",
    "Shoes",
    "Sportswear",
    "Home",
    "Electronics",
    "Mobile",
    "Computer",
    "All Categories",
  );
}
