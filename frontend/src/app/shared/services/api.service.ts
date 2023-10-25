import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

/* Standard Api parameters */
interface IPath {
  path: string;
}

interface IOptions {
  options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  };
}

/* Method related parameters */
interface IGetMethod extends IPath, IOptions {}


interface IPostMethod extends IPath, IOptions {
  body: object;
}

/* CRUD method interface */
export interface IApiService {
  get<T>(params: IGetMethod): Observable<T>;

  post<T>(params: IPostMethod): Observable<T>;
}

@Injectable({
  providedIn: "root"
})
export class ApiService implements IApiService {

  constructor(private httpClient: HttpClient) {
  }

  get = <T>(params: IGetMethod): Observable<T> => this.httpClient.get<T>(params.path, params.options);

  post = <T>(params: IPostMethod): Observable<T> => this.httpClient.post<T>(params.path, params.body, params.options);
}
