import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Visit} from "../../models";
@Injectable()
export class VisitService {

  constructor(private http: Http) {
  }

  getAllVisitForOne(): Observable<Visit[]>
  {
    var sta =JSON.parse(sessionStorage.getItem("loginUser")).email;
    //var params = JSON.stringify();
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/visitsForOne',sta,options).map((response: Response) => <Visit[]> response.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  dodajPosetu(prvi: string, drugi: string, treci: string): Observable<Visit>{
    var fr = {id: null, email: prvi, nazivRestorana: drugi, datum : treci};
    //var params =  JSON.stringify(fr);
    var t = prvi + ";" + drugi + ";" + treci;
    // var sta = JSON.parse(t);
    console.log(" usao pre posta " + prvi + " " + drugi);
    //console.log("sta je params za dodajPrijateljstvo " + (params.toString()));
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8090/dodajVisit',t,options).map(this.extractVisit)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }


  izmeniPosetu(prvi: number,drugi :number): Observable<Visit>{

    var v = prvi + ";" + drugi;


    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put('http://localhost:8090/izmeniVisit',v, options).map(this.extractVisit)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }




  private extractVisit(res: Response) {
    let body = <Visit> res.json();

    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
