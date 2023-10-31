import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root"
})
export class ItemCategoryService {
  private readonly _endpoint: string = "http://localhost:8080/api/v1/categories";

  constructor(private httpClient: HttpClient) {
  }

  public getListOfCategories() {
    return this.httpClient.get<Array<Category>>(this._endpoint);
  }
}
