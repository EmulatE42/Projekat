import { Component, OnInit } from '@angular/core';
import {FriendRequest, Friendship, Guest} from "../../../models";
import {Router} from "@angular/router";
import {FriendService} from "../../../services/friend/FriendService";
import {FriendRequestService} from "../../../services/friend/FriendRequestService";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  private potencijalni: Guest[] = [];
  private svi: Guest[] = [];
  private prijatelji: Guest[] = [] ;
  private poslatiZahtevi: Guest[] = [];
  private primljeniZahtevi: Guest[] = [];

  private poslednjePrijat : Friendship;
  private poslednjiZahtev : FriendRequest;
  private errorMessage: string = "Doslo je do greske!";
  constructor(private friendService:FriendService,private friendRequestService:FriendRequestService) {

    this.friendRequestService.getPoslateZahteve()
      .subscribe(guests => this.poslatiZahtevi = guests,
        error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendRequestService.getPrimljeneZahteve()
      .subscribe(guests => this.primljeniZahtevi = guests,
        error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendService.getAll()
    .subscribe(guests => this.svi = guests,
      error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendService.getAllFR()
      .subscribe(guests => this.prijatelji = guests,
        error => this.errorMessage = <any>error, () => this.vidi()); }

  ngOnInit(): void {



console.log("POZIVAM INIT");

  }

  dodaj(g: Guest) : void{
    this.friendRequestService.dodajZahtev(JSON.parse(sessionStorage.getItem("loginUser")).email,g.email).subscribe(f => this.poslednjiZahtev = f,error => this.errorMessage = <any>error,  () => this.osvezi());
    //this.friendService.dodajPrijateljstvo(JSON.parse(sessionStorage.getItem("loginUser")).email,g.email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());

    //this.friendService.dodajPrijateljstvo(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());
    //console.log("ZAVRSIO U DODAJ, poslednje prijat je null " + (this.poslednjePrijat == null));

  }

  osvezi() : void
  {

    console.log("OSVEZAVAM");

    this.friendRequestService.getPoslateZahteve()
      .subscribe(guests => this.poslatiZahtevi = guests,
        error => this.errorMessage = <any>error,  () => this.vidi());

    this.friendRequestService.getPrimljeneZahteve()
      .subscribe(guests => this.primljeniZahtevi = guests,
        error => this.errorMessage = <any>error,  () => this.vidi());

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
    console.log("NE SME VECE OD 0" + this.prijatelji.length);
    if (this.prijatelji == undefined)
    {
      console.log("helllo xD");
    }
    if (this.prijatelji.length > 0) { // ako ima prijatelje dodaj sve sem njega i onih koji su vec prijatelji
      for (var i = 0; i < this.svi.length; i++) {
        var flag = true;
        for (var j = 0; j < this.prijatelji.length; j++) {
          if (this.svi[i].email == this.prijatelji[j].email || this.svi[i].email == JSON.parse(sessionStorage.getItem("loginUser")).email) {
            flag = false;
          }
        }

        //console.log("DUZINA LISTE JEEEEEEEE " + this.poslatiZahtevi.length);
          for (var k = 0; k < this.poslatiZahtevi.length; k++) {
            //console.log("HERE  " +this.poslatiZahtevi[k].email + " drugi svi je " +  this.svi[i].email );
            if (this.poslatiZahtevi[k].email == this.svi[i].email)
            {
              flag = false;
            }
          }

        for (var k = 0; k < this.primljeniZahtevi.length; k++) {
          //console.log("HERE  " +this.primljeniZahtevi[k].email + " drugi svi je " +  this.svi[i].email );
          if (this.primljeniZahtevi[k].email == this.svi[i].email)
          {
            flag = false;
          }
        }


        if (flag) {
          console.log("DODAO SAM " + this.svi[i].email);
          this.potencijalni.push(this.svi[i]);
        }
      }
    }
    else // ako nema prijatelje dodaj sve sem njega
    {

      for (var i = 0; i < this.svi.length; i++) {
        var flag = true;
        if (this.svi[i].email != JSON.parse(sessionStorage.getItem("loginUser")).email) {
          for (var k = 0; k < this.poslatiZahtevi.length; k++) {
            //console.log("HERE  " +this.poslatiZahtevi[k].email + " drugi svi je " +  this.svi[i].email );
            if (this.poslatiZahtevi[k].email == this.svi[i].email)
            {
              flag = false;
            }
          }

          for (var k = 0; k < this.primljeniZahtevi.length; k++) {
            console.log("UDJI KONJU  " +this.primljeniZahtevi[k].email + " drugi svi je " +  this.svi[i].email );
            if (this.primljeniZahtevi[k].email == this.svi[i].email)
            {
              flag = false;
            }
          }


          if (flag) {
            console.log("DODAO SAM U FOREVER ALONE " + this.svi[i].email);

            this.potencijalni.push(this.svi[i]);
          }
        }
      }

      }

    }


}
