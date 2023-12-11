import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Api} from "../api.service";
import UserItem = Api.UserApi.UserItem;

@Injectable({
  providedIn: "root"
})
export class UserItemsService {
  private apiService = inject(Api.Service);

  public fetchUserItems(): Observable<UserItem[]> {
    return this.apiService.getUserItems();
  }
}
