import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Drink, Food, Order, OrderFood} from "../../models";

@Injectable()
export class OrderService
{
  private getFoodsLink = 'http://localhost:8090/foods';
  private getDrinksLink = 'http://localhost:8090/drinks';
  private getOrdersLink = 'http://localhost:8090/orders';
  private addOrderLink = 'http://localhost:8090/add_order';
  private addOrderFoodLink = 'http://localhost:8090/add_order_food';

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

  getOrders(): Observable<Order[]>{

    return this.http.get(this.getOrdersLink).map(this.extractOrders)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  addOrder(order: Order): Observable<Order>{

    var newOrder = {id: null, nazivRestorana: "Domaciniski", vreme: "18:20", brojStola: [1]};
    var params = JSON.stringify(newOrder);

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addOrderLink,params, options).map(this.extractOrder)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  addOrderFood(order_food: OrderFood): Observable<OrderFood>{

    var newOrderFood = {order_food_id: null, order: order_food.order, food: order_food.food };
    var params = JSON.stringify(newOrderFood);

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addOrderFoodLink,params, options).map(this.extractOrderFood)
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

  private extractOrders(res: Response) {
    let body = <Order[]> res.json();
    console.log(body);
    return body || { };
  }

  private extractOrder(res: Response) {
    let body = <Order> res.json();
    return body || { };
  }

  private extractOrderFood(res: Response) {
    let body = <OrderFood> res.json();
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
