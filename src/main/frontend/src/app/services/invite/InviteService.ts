
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Friendship, Guest, FriendRequest, Invite} from "../../models";
@Injectable()
export class InviteService
{

  constructor(private http: Http) { }

  dodajPoziv(invite : Invite): Observable<Invite>{

    var i = {id: null, poslao : invite.poslao , primio : invite.primio , imeRestorana: invite.imeRestorana, datum: invite.datum, idPorudzbine: invite.idPorudzbine};

    var params = JSON.stringify(i);

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/dodajPoziv',params,options).map(this.extractFriendRequest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  obrisiPoziv(prvi: string, drugi: string,treci : number): Observable<Invite>{
    var fr = {id: null, poslao: prvi, primio: drugi, idPorudzbine : treci};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi + ";" + treci;

    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/obrisiPoziv',t,options).map(this.extractFriendRequest)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPrimljenePozive(): Observable<Invite[]>{ // ovo su useri koji su poslali zahtev trenutnom ulogovanom

    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/nadjiSvePozive',sta,options).map((response: Response) => <Guest[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  private extractFriendRequest(res: Response) {
    let body = <Invite> res.json();

    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
