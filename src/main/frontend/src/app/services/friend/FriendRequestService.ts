
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Friendship, Guest, FriendRequest} from "../../models";
@Injectable()
export class FriendRequestService
{

  constructor(private http: Http) { }

  dodajZahtev(prvi: string, drugi: string): Observable<FriendRequest>{ // dodaje se zahtev u bazu
    var fr = {id: null, koSalje: prvi, komeSeSalje: drugi};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi;
    // var sta = JSON.parse(t);
    console.log(" usao pre posta " + prvi + " " + drugi);
    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/dodajZahtev',t,options).map(this.extractFriendRequest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }
  obrisiZahtev(prvi: string, drugi: string): Observable<FriendRequest>{
    var fr = {id: null, koSalje: prvi, komeSeSalje: drugi};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi;
    // var sta = JSON.parse(t);
    console.log(" usao pre posta " + prvi + " " + drugi);
    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/obrisiZahtev',t,options).map(this.extractFriendRequest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }



  getPoslateZahteve(): Observable<Guest[]>{ // ovo su useri kojima je poslat zahtev od strane trenutno ulogovanog

    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/nadjiPoslateZahteve',sta,options).map((response: Response) => <Guest[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPrimljeneZahteve(): Observable<Guest[]>{ // ovo su useri koji su poslali zahtev trenutnom ulogovanom

    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/nadjiPrimljeneZahteve',sta,options).map((response: Response) => <Guest[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  private extractFriendRequest(res: Response) {
    let body = <FriendRequest> res.json();

    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
