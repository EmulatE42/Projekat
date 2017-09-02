import { Component, OnInit } from '@angular/core';
import {Guest} from "../../../models";
import {FriendService} from "../../../services/friend/FriendService";
import {FriendRequestService} from "../../../services/friend/FriendRequestService";

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {
  private errorMessage: string = "Doslo je do greske!";
  private poslatiZahtevi: Guest[] = [];

  constructor(private friendRequestService:FriendRequestService) {
    this.friendRequestService.getPoslateZahteve()
      .subscribe(guests => this.poslatiZahtevi = guests,
        error => this.errorMessage = <any>error);
  }

  ngOnInit() {
  }

}
