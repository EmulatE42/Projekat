import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Cook, Guest, User, Waiter, Bartender, Supplier} from "../../models";

@Injectable()
export class UserService
{
  private loginUrl = 'http://localhost:8090/login';
  private registerUrl = 'http://localhost:8090/register';
  private updateWaiterPasswordUrl = 'http://localhost:8090/waiter/change/password';
  private updateCookPasswordUrl = 'http://localhost:8090/cook/change/password';
  private updateBartenderPasswordUrl = 'http://localhost:8090/bartender/change/password';
  private updateWaiterUrl = 'http://localhost:8090/waiter/update';
  private updateCookUrl = 'http://localhost:8090/cook/update';
  private updateBartenderUrl = 'http://localhost:8090/bartender/update';
  private updateGuestUrl = 'http://localhost:8090/guest/update';
  private updateGuestPasswordUrl = 'http://localhost:8090/guest/change/password';

  private updateSupplierPasswordUrl = 'http://localhost:8090/supplier/change/password';

  private updateSupplierUrl = 'http://localhost:8090/supplier/update';

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

    var guest = {id: null, first_name: firstname, last_name: lastname, email: email, password: password, adresa: null,enabled:false};
    var params = JSON.stringify(guest);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.registerUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  updateGuest(guest: Guest): Observable<User>{

    var guest1 = {id: guest.id, first_name: guest.first_name, last_name: guest.last_name, avatar: guest.avatar, adresa: guest.adresa,enabled: guest.enabled};
    var params = JSON.stringify(guest1);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateGuestUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateGuestPassword(email: string, password: string): Observable<User>{

    var user = {id: null, first_name: null, last_name: null, email: email, password: password, role: null,adresa : null};
    var params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateGuestPasswordUrl, params, options).map(this.extractGuest)
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

  updateSupplierPassword(email: string, password: string): Observable<User>{

    var user = {id: null, first_name: null, last_name: null, email: email, password: password, role: null};
    var params = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateSupplierPasswordUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateWaiter(waiter: Waiter): Observable<User>{

    var guest = {id: waiter.id, first_name: waiter.first_name, last_name: waiter.last_name, avatar: waiter.avatar, birth: waiter.birth, dressSize: waiter.dressSize, shoeSize: waiter.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateWaiterUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateCook(cook: Cook): Observable<User>{

    var guest = {id: cook.id, first_name: cook.first_name, last_name: cook.last_name, avatar: cook.avatar, birth: cook.birth, dressSize: cook.dressSize, shoeSize: cook.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateCookUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateBartender(bartender: Bartender): Observable<User>{

    var guest = {id: bartender.id, first_name: bartender.first_name, last_name: bartender.last_name, avatar: bartender.avatar, birth: bartender.birth, dressSize: bartender.dressSize, shoeSize: bartender.shoeSize};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateBartenderUrl, params, options).map(this.extractGuest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateSupplier(supplier: Supplier): Observable<User>{

    var guest = {id: supplier.id, first_name: supplier.first_name, last_name: supplier.last_name, avatar: supplier.avatar, birth: supplier.birth};
    var params = JSON.stringify(guest);
    console.log(params);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.updateSupplierUrl, params, options).map(this.extractGuest)
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
