import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Drink, Food, Order, OrderFood, OrderDrink} from "../../models";

@Injectable()
export class OrderService
{
  private getFoodsLink = 'http://localhost:8090/foods';
  private getDrinksLink = 'http://localhost:8090/drinks';
  private getOrdersLink = 'http://localhost:8090/orders';
  private addOrderLink = 'http://localhost:8090/add_order';
  private addOrderFoodLink = 'http://localhost:8090/add_order_food';
  private addOrderDrinkLink = 'http://localhost:8090/add_order_drink'
  private getOrderFoodsLink = 'http://localhost:8090/order_foods';
  private updateOrderFoodsReadyLink = 'http://localhost:8090/update_order_food_ready';
  private updateOrderReadyLink = 'http://localhost:8090/update_order_ready';
  private updateOrderFoodsAcceptLink = 'http://localhost:8090/update_order_food_accept'
  private getOrderDrinksLink = 'http://localhost:8090/order_drinks';
  private updateOrderDrinksReadyLink = 'http://localhost:8090/update_order_drink_ready'
  private updateOrderAcceptLink = 'http://localhost:8090/update_order_accept';

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

  getOrderFoods(): Observable<OrderFood[]>{

    return this.http.get(this.getOrderFoodsLink).map(this.extractOrderFoods)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getOrderDrinks(): Observable<OrderDrink[]>{

    return this.http.get(this.getOrderDrinksLink).map(this.extractOrderDrinks)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  addOrder(order: Order): Observable<Order>{

    var newOrder = {id: null, nazivRestorana: order.nazivRestorana, vreme: order.vreme, brojStola: order.brojStola,accept : order.accept, ready: order.ready };
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

  addOrderDrink(order_drink: OrderDrink): Observable<OrderDrink>{

    var newOrderDrink = {order_drink_id: null, order: order_drink.order, drink: order_drink.drink };
    var params = JSON.stringify(newOrderDrink);

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.addOrderDrinkLink,params, options).map(this.extractOrderDrink)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  updateOrderFoodReady(order_food: OrderFood): Observable<OrderFood>{

    var newOrderFood = {order_food_id: order_food.order_food_id, order: order_food.order, food: order_food.food };
    var params = JSON.stringify(newOrderFood);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateOrderFoodsReadyLink,params, options).map(this.extractOrderFood)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  updateOrderDrinkReady(order_drink: OrderDrink): Observable<OrderDrink>{

    var newOrderDrink = {order_drink_id: order_drink.order_drink_id, order: order_drink.order, drink: order_drink.drink };
    var params = JSON.stringify(newOrderDrink);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateOrderDrinksReadyLink,params, options).map(this.extractOrderDrink)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  deleteOrderFoods(order: Order): Observable<OrderFood>{

    var newOrder = {id: order.id};
    var params = JSON.stringify(newOrder);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:8090/delete_order_foods',params, options).map(this.extractOrderFood)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateOrderFoodAccept(order_food: OrderFood): Observable<OrderFood>{

    var newOrderFood = {order_food_id: order_food.order_food_id, order: order_food.order, food: order_food.food };
    var params = JSON.stringify(newOrderFood);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateOrderFoodsAcceptLink,params, options).map(this.extractOrderFood)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  updateOrderReady(order: Order): Observable<Order>{

    var newOrder = {id: order.id};
    var params = JSON.stringify(newOrder);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateOrderReadyLink,params, options).map(this.extractOrder)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);

  }

  updateOrderAccept(order: Order): Observable<Order>{

    var newOrder = {id: order.id};
    var params = JSON.stringify(newOrder);


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateOrderAcceptLink,params, options).map(this.extractOrder)
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

  private extractOrderFoods(res: Response) {
    let body = <OrderFood[]> res.json();
    console.log(body);
    return body || { };
  }

  private extractOrderDrinks(res: Response) {
    let body = <OrderDrink[]> res.json();
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

  private extractOrderDrink(res: Response) {
    let body = <OrderDrink> res.json();
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
