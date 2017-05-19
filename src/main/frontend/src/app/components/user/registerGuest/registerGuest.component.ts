import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Guest} from "../../../models";

@Component({
  templateUrl: './registerGuest.component.html',
  providers: [UserService],
})

export class RegisterGuest{
  firstname: string;
  lastname: string;
  email: string;
  password1: string;
  password2: string;
  guest: Guest;

  constructor(
    private userService: UserService,
    private router: Router) { }

  register(): void
  {
    this.userService.register(this.firstname, this.lastname, this.email, this.password1).subscribe(guest => this.guest = guest, error => alert(error), () => this.com());
  }

  com(): void
  {
    if(JSON.stringify(this.guest) !== '{}') {
      this.router.navigate(['../login']);
    }
    else
      document.getElementById("login").innerHTML = "<div class=\"alert alert-danger col-sm-offset-4 col-sm-4\"> Enter email alredy exists!  </div>";
  }

}
