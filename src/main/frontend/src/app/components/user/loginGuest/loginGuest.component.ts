import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Guest} from "../../../models";

@Component({
  templateUrl: './loginGuest.component.html',
  providers: [UserService],
})

export class LoginGuest{
  email: string;
  password: string;
  guest: Guest;

  constructor(
    private userService: UserService,
    private router: Router) { }

  login(): void
  {
    this.userService.login(this.email, this.password).subscribe(guest => this.guest = guest, error => alert(error), () => this.com());
  }

  com(): void
  {
    if(JSON.stringify(this.guest) !== '{}')
      this.router.navigate(['../welcome']);
    else
      document.getElementById("login").innerHTML = "Neuspesno logovanje!";
  }

}
