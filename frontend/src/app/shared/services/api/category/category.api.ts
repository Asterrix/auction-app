import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Category} from "./category.type";

enum Endpoint {
  Categories = "categories"
}

@Injectable({
  providedIn: "root"
})
export class CategoryApi {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public categories: () => Observable<Category[]> = () => {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/${Endpoint.Categories}`);
  };
}
