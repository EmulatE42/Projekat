import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Bartender, Cook, Guest, Role, SuperUser, Supplier, User, Waiter} from "./models"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  user:any;
  provera:any;
  putanja:string;




  ngOnInit(): void {

    this.user = sessionStorage.getItem("loginUser");
  }

  proveriUsera(): void
  {
    this.user = sessionStorage.getItem("loginUser");
     this.provera = JSON.parse(sessionStorage.getItem("loginUser"));
    if( Role[this.provera.role] == Role.GOST.toString()) {
      this.putanja = '../guest/account';
    }
    else if( Role[this.provera.role] == Role.KONOBAR.toString()) {
      this.putanja ='../waiter/account';
    }
    else if( Role[this.provera.role] == Role.KUVAR.toString()) {
      this.putanja ='../cook/account';
    }
    else if( Role[this.provera.role] == Role.SANKER.toString()) {
      this.putanja ='../bartender/account';
    }
    else if( Role[this.provera.role] == Role.PONUDJAC.toString()) {
      this.putanja ='../supplier/account';
    }
  }
  izlogovao(): void
  {
    sessionStorage.clear();
    this.proveriUsera();

  }


}
