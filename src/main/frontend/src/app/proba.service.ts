import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './model';
import 'rxjs/add/operator/map'
@Injectable()
export class ProbaService {

  public TrenutniKorisnik:User;

  constructor(private  http:Http) { }
  regi(id: number, first_name:string,last_name:string,email:string,password:string){
    this.TrenutniKorisnik = new User(id ,first_name,last_name,email,password);
    var par = JSON.stringify(this.TrenutniKorisnik);
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:8090/upis",par,{headers:headers}).map(res=>res.json());
  }

}
