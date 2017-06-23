import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Drink, Food, Guest, Restaurant} from "../../models";




@Injectable()
export class FoodService
{

  constructor(private http: Http) { }

  getAllFood(): Observable<Food[]>{

    return this.http.get('http://localhost:8090/allfoods').map(this.extractFood)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);


  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  private extractFood(res: Response) {
    let body = <Food[]> res.json();
    console.log(body);
    return body || { };
  }
}
