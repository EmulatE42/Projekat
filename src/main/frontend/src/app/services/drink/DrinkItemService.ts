import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Drink, Food, Guest, OrderDrinkItem, Restaurant} from "../../models";
@Injectable()
export class DrinkItemService
{

  constructor(private http: Http) { }

  sacuvajOrderDrinkItem( odi : OrderDrinkItem ): Observable<OrderDrinkItem>{
    var guest = {id: null, drinks: odi.drinks, nazivRestorana: odi.nazivRestorana};

    var params = JSON.stringify(guest);
    console.log("RESTORAN JE " + odi.nazivRestorana + "VELICINA ITEMA JE " + odi.drinks.length);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/upisiOrderDrinkItem',params,options).map(this.extractOrderDrinkItem)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);


  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  private extractOrderDrinkItem(res: Response) {
    let body = <OrderDrinkItem> res.json();
    console.log(body);
    return body || { };
  }

  getAll(): Observable<OrderDrinkItem[]>{

    return this.http.get('http://localhost:8090/OrderDrinkItems').map((response: Response) => <OrderDrinkItem[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);


  }
}
