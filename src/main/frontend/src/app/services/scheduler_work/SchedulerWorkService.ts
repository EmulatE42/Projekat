import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import {Cook, Guest, User, Waiter, Bartender, Supplier, SchedulerWork} from "../../models";

@Injectable()
export class SchedulerWorkService
{

  constructor(private http: Http) { }



  getSchedulerWork(id: number): Observable<SchedulerWork>{

    return this.http.get('http://localhost:8090/scheduler_work/' + id).map(this.extractSchedulerWork)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractSchedulerWork(res: Response) {
    let body = <SchedulerWork> res.json();
    console.log(body);
    return body || { };
  }

  private handleError(error: Response)
  {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
