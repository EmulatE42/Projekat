import { Component, OnInit } from '@angular/core';
import {Friendship, Guest} from "../../../models";
import {FriendService} from "../../../services/friend/FriendService";
import {Router} from "@angular/router";
@Component({
  selector: 'app-basic-guest-friends',
  templateUrl: './basicGuestFriends.html',
  styleUrls: ['./basicGuestFriends.css']

})
export class BasicGuestFriendsComponent implements OnInit {
  private guests: Guest[];
  private errorMessage: string = "Doslo je do greske!";
  private message: string;
  private poslednjePrijat : Friendship;
  constructor(private friendService:FriendService,private router: Router ) {
    this.friendService.getAllFR()
    .subscribe(guests => this.guests = guests,
      error => this.errorMessage = <any>error); }

  ngOnInit(): void {

  }
  delete(g: Guest): void
  {
    console.log("za BRISANJE trenutni je " +JSON.parse(sessionStorage.getItem("loginUser")).email + "drugi je " +  g.email);

    this.friendService.obrisiPrijateljstvo(JSON.parse(sessionStorage.getItem("loginUser")).email,g.email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());

    this.friendService.obrisiPrijateljstvo(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.poslednjePrijat = f,error => this.errorMessage = <any>error,  () => this.osvezi());


  }
  osvezi () : void
  {
    this.friendService.getAllFR()
      .subscribe(guests => this.guests = guests,
        error => this.errorMessage = <any>error);
  }
  prebaciNaDodavanje() : void
  {
    console.log("PREBACUJEM");
    this.router.navigate(['../guest/friends/add']);
  }

}

