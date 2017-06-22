import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Friendship, Guest, Restaurant} from "../../models";

@Injectable()
export class FriendService
{

  constructor(private http: Http) { }

  getAllFR(): Observable<Guest[]>{ // OVO SU SVI PRIJATELJI TRENUTNO ULOGOVANOG
    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/friends',sta,options).map((response: Response) => <Guest[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getAll(): Observable<Guest[]>{ // OVO SU SVI USERI, pa cu onda od ovih da oduzmem prijatelje plus samog sebe

    return this.http.get('http://localhost:8090/allGuests').map((response: Response) => <Guest[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  dodajPrijateljstvo(prvi: string, drugi: string): Observable<Friendship>{ // OVO SU SVI USERI, pa cu onda od ovih da oduzmem prijatelje plus samog sebe
    var fr = {id: null, koSalje: prvi, komeSeSalje: drugi};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi;
   // var sta = JSON.parse(t);
    console.log(" usao pre posta " + prvi + " " + drugi);
    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/dodajPrijateljstvo',t,options).map(this.extractFriendship)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  obrisiPrijateljstvo(prvi: string, drugi: string): Observable<Friendship>{
    var fr = {id: null, koSalje: prvi, komeSeSalje: drugi};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi;
    // var sta = JSON.parse(t);
    console.log(" usao pre posta " + prvi + " " + drugi);
    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/obrisiPrijateljstvo',t,options).map(this.extractFriendship)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractFriendship(res: Response) {
    let body = <Friendship> res.json();

    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
