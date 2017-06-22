import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Drink, Food} from "../../models";

@Injectable()
export class OrderService
{
  private getFoodsLink = 'http://localhost:8090/foods';
  private getDrinksLink = 'http://localhost:8090/drinks';

  constructor(private http: Http) { }

  getFoods(): Observable<Food[]>{

    return this.http.get(this.getFoodsLink).map(this.extractFood)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getDrinks(): Observable<Drink[]>{

    return this.http.get(this.getDrinksLink).map(this.extractDrink)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractFood(res: Response) {
    let body = <Food[]> res.json();
    console.log(body);
    return body || { };
  }

  private extractDrink(res: Response) {
    let body = <Drink[]> res.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
