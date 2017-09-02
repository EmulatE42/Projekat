import { Component, OnInit } from '@angular/core';
import {FriendRequest, Friendship, Guest} from "../../../models";
import {FriendService} from "../../../services/friend/FriendService";
import {FriendRequestService} from "../../../services/friend/FriendRequestService";

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.css']
})
export class ReceivedRequestsComponent implements OnInit {

  private dobijeni: Guest[] = [];
  private posld: FriendRequest;
  private fa: Friendship;
  private errorMessage: string = "Doslo je do greske!";
  constructor(private friendService:FriendService, private friendRequestService:FriendRequestService) {

    this.friendRequestService.getPrimljeneZahteve()
      .subscribe(guests => this.dobijeni = guests,
        error => this.errorMessage = <any>error);


  }

  ngOnInit() {
  }

  prihvati( g: Guest) : void
{
  this.friendService.dodajPrijateljstvo(JSON.parse(sessionStorage.getItem("loginUser")).email,g.email).subscribe(f => this.fa = f,error => this.errorMessage = <any>error);

  this.friendService.dodajPrijateljstvo(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.fa = f,error => this.errorMessage = <any>error);
  this.obrisi(g);
}
  obrisi(g: Guest) : void
  {
  this.friendRequestService.obrisiZahtev(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.posld = f,error => this.errorMessage = <any>error,  () => this.osvezavam());
  }


  osvezavam() : void {

    this.friendRequestService.getPrimljeneZahteve()
      .subscribe(guests => this.dobijeni = guests,
        error => this.errorMessage = <any>error);
  }

}
