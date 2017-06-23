import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Drink, Food, Guest, Restaurant} from "../../models";
@Injectable()
export class DrinkService
{

  constructor(private http: Http) { }

  getAllDrink(): Observable<Drink[]>{

    return this.http.get('http://localhost:8090/alldrinks').map(this.extractDrink)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);


  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  private extractDrink(res: Response) {
    let body = <Drink[]> res.json();
    console.log(body);
    return body || { };
  }
}
