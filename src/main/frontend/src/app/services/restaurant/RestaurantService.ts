import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Food, Guest, Restaurant} from "../../models";

@Injectable()
export class RestaurantService
{

  constructor(private http: Http) { }

  getAll(): Observable<Restaurant[]>{

    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/restaurants',sta,options, ).map((response: Response) => <Restaurant[]> response.json())
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
