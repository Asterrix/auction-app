import {CommonModule} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {SearchService} from "../../../../services/search.service";

@Component({
  selector: "app-search-suggestion",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./search-suggestion.component.html",
  styleUrls: ["./search-suggestion.component.scss"]
})
export class SearchSuggestionComponent implements OnInit {
  suggestion$: Observable<string> | undefined;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.suggestion$ = this.searchService.getSuggestion();
  }

  handleSearchSuggestionClick(): void {
    this.searchService.handleSearchSuggestionNavigation();
  }
}
