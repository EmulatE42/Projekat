import { Component, OnInit } from '@angular/core';
import {Guest} from "../../../models";
import {FriendService} from "../../../services/friend/FriendService";

@Component({
  selector: 'app-basic-guest-friends',
  templateUrl: './basicGuestFriends.html',
  styleUrls: ['./basicGuestFriends.css']
})
export class BasicGuestFriendsComponent implements OnInit {
  private guests: Guest[];
  private errorMessage: string = "Doslo je do greske!";
  private message: string;
  constructor(private friendService:FriendService ) { }
// FRIEND NE RADI LEPO
  ngOnInit(): void {
    this.friendService.getAll()
      .subscribe(guests => this.guests = guests,
        error => this.errorMessage = <any>error);
  }

}

