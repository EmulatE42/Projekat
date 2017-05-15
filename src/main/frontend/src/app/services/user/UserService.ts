import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Guest, User} from "../../models";

@Injectable()
export class UserService
{
  private loginUrl = 'http://localhost:8090/guest/login';
  private registerUrl = 'http://localhost:8090/guest/register';

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<Guest>{

    var guest = {id: null, first_name: null, last_name: null, email: email, password: password, online: null};
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
