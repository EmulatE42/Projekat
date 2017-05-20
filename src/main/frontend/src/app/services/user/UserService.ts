import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Cook, Guest, User, Waiter, Bartender} from "../../models";

@Injectable()
export class UserService
{
  private loginUrl = 'http://localhost:8080/login';
  private registerUrl = 'http://localhost:8080/register';
  private updateWaiterPasswordUrl = 'http://localhost:8080/waiter/change/password';
  private updateCookPasswordUrl = 'http://localhost:8080/cook/change/password';
  private updateBartenderPasswordUrl = 'http://localhost:8080/bartender/change/password';
  private updateWaiterUrl = 'http://localhost:8080/waiter/update';
  private updateCookUrl = 'http://localhost:8080/cook/update';
  private updateBartenderUrl = 'http://localhost:8080/bartender/update';

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<User>{

    var guest = {id: null, first_name: null, last_name: null, email: email, password: password, role: null};
    var params = JSON.stringify(guest);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<Guest>{

    var guest = {id: null, first_name: firstname, last_name: lastname, email: email, password: password, online: null};
    var params = JSON.stringify(guest);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.registerUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateWaiterPassword(email: string, password: string): Observable<User>{

    var user = {id: null, first_name: null, last_name: null, email: email, password: password, role: null};
    var params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateWaiterPasswordUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateCookPassword(email: string, password: string): Observable<User>{

    var user = {id: null, first_name: null, last_name: null, email: email, password: password, role: null};
    var params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateCookPasswordUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateBartenderPassword(email: string, password: string): Observable<User>{

    var user = {id: null, first_name: null, last_name: null, email: email, password: password, role: null};
    var params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateBartenderPasswordUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateWaiter(waiter: Waiter): Observable<User>{

    var guest = {id: waiter.id, first_name: waiter.first_name, last_name: waiter.last_name, birth: waiter.birth, dressSize: waiter.dressSize, shoeSize: waiter.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateWaiterUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateCook(cook: Cook): Observable<User>{

    var guest = {id: cook.id, first_name: cook.first_name, last_name: cook.last_name, birth: cook.birth, dressSize: cook.dressSize, shoeSize: cook.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateCookUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateBartender(bartender: Bartender): Observable<User>{

    var guest = {id: bartender.id, first_name: bartender.first_name, last_name: bartender.last_name, birth: bartender.birth, dressSize: bartender.dressSize, shoeSize: bartender.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateBartenderUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractGuest(res: Response) {
    let body = <User> res.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
