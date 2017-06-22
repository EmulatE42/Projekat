import { Component, OnInit } from '@angular/core';
import {Friendship, Guest} from "../../../models";
import {Router} from "@angular/router";
import {FriendService} from "../../../services/friend/FriendService";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  private potencijalni: Guest[] = [];
  private svi: Guest[] ;
  private prijatelji: Guest[] ;

  private poslednjePrijat : Friendship;
  private errorMessage: string = "Doslo je do greske!";
  constructor(private friendService:FriendService,private router: Router ) { this.friendService.getAll()
    .subscribe(guests => this.svi = guests,
      error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendService.getAllFR()
      .subscribe(guests => this.prijatelji = guests,
        error => this.errorMessage = <any>error, () => this.vidi()); }

  ngOnInit(): void {



console.log("POZIVAM INIT");

  }

  dodaj(g: Guest) : void{
    this.friendService.dodajPrijateljstvo(JSON.parse(sessionStorage.getItem("loginUser")).email,g.email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());

    this.friendService.dodajPrijateljstvo(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());
    //console.log("ZAVRSIO U DODAJ, poslednje prijat je null " + (this.poslednjePrijat == null));

  }

  osvezi() : void
  {
    console.log("OSVEZAVAM");
    this.friendService.getAll()
      .subscribe(guests => this.svi = guests,
        error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendService.getAllFR()
      .subscribe(guests => this.prijatelji = guests,
        error => this.errorMessage = <any>error, () => this.vidi());
  }

  vidi() : void {
    this.potencijalni = [];
    var a = 0;
    if (this.prijatelji.length > 0) {
      for (var i = 0; i < this.svi.length; i++) {
        var flag = true;
        for (var j = 0; j < this.prijatelji.length; j++) {
          if (this.svi[i].email == this.prijatelji[j].email || this.svi[i].email == JSON.parse(sessionStorage.getItem("loginUser")).email) {
            flag = false;
          }
        }
        if (flag) {
          console.log("DODAO SAM " + this.svi[i].email);
          this.potencijalni.push(this.svi[i]);
        }
      }
    }
    else
    {

      for (var i = 0; i < this.svi.length; i++) {
        if (this.svi[i].email != JSON.parse(sessionStorage.getItem("loginUser")).email) {
          console.log("DODAO SAM U FOREVER ALONE " + this.svi[i].email);

          this.potencijalni.push(this.svi[i]);
        }
      }

      }
    }


}
