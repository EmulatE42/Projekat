import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Guest, Restaurant} from "../../models";

@Injectable()
export class RestaurantService
{

  constructor(private http: Http) { }

  getAll(): Observable<Restaurant[]>{

    return this.http.get('http://localhost:8080/restaurants').map((response: Response) => <Restaurant[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractGuest(res: Response) {
    let body = <Guest> res.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
