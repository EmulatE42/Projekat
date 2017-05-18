import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Guest, Role, User} from "../../../models";

@Component({
  templateUrl: './loginGuest.component.html',
  providers: [UserService],
})

export class LoginGuest{
  email: string;
  password: string;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router) { }

  login(): void
  {
    this.userService.login(this.email, this.password).subscribe(user => this.user = user, error => alert(error), () => this.com());
  }

  com(): void
  {

    if(JSON.stringify(this.user) !== '{}') {
      sessionStorage.setItem('loginUser', JSON.stringify(this.user));

      if( Role[this.user.role] == Role.GOST.toString()) {
        this.router.navigate(['../']);
      }
      else if( Role[this.user.role] == Role.KONOBAR.toString()) {
        this.router.navigate(['../waiter/account']);
      }
      else if( Role[this.user.role] == Role.KUVAR.toString()) {
        this.router.navigate(['../cook/account']);
      }
      else if( Role[this.user.role] == Role.SANKER.toString()) {
        this.router.navigate(['../bartender/account']);
      }
    }
    else
      document.getElementById("login").innerHTML = "<div class=\"alert alert-danger col-sm-offset-4 col-sm-4\"> Wrong email/password! </div>";
  }

}
