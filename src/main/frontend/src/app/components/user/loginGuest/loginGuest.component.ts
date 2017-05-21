import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Bartender, Cook, Guest, Role, SuperUser, User, Waiter} from "../../../models";

@Component({
  templateUrl: './loginGuest.component.html',
  providers: [UserService],
})

export class LoginGuest{
  email: string;
  password: string;

  user: User;
  guest: Guest;
  waiter: Waiter;
  cook: Cook;
  bartender: Bartender;

  constructor(
    private userService: UserService,
    private router: Router) { }

  login(): void
  {
    this.userService.login(this.email, this.password).subscribe(user => this.converte(<SuperUser> user), error => alert(error), () => this.com());
  }

  com(): void
  {
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));
    if(JSON.stringify(this.user) !== '{}') {

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

  converte(user: SuperUser): void
  {

    if(JSON.stringify(user) !== '{}') {

      if( Role[user.role] == Role.GOST.toString()) {
        this.guest = new Guest(user.id, user.first_name, user.last_name, user.email, user.password, user.role, user.avatar, user.online);
        sessionStorage.setItem('loginUser', JSON.stringify(this.guest));
      }
      else if( Role[user.role] == Role.KONOBAR.toString()) {
        this.waiter = new Waiter(user.id, user.first_name, user.last_name, user.email, user.password, user.role, user.avatar, user.birth, user.dressSize, user.shoeSize, user.firstTimeLogin);
        sessionStorage.setItem('loginUser', JSON.stringify(this.waiter));
      }
      else if( Role[user.role] == Role.KUVAR.toString()) {
        this.cook = new Cook(user.id, user.first_name, user.last_name, user.email, user.password, user.role, user.avatar, user.birth, user.dressSize, user.shoeSize, user.firstTimeLogin);
        sessionStorage.setItem('loginUser', JSON.stringify(this.cook));
      }
      else if( Role[user.role] == Role.SANKER.toString()) {
        this.bartender = new Bartender(user.id, user.first_name, user.last_name, user.email, user.password, user.role, user.avatar, user.birth, user.dressSize, user.shoeSize, user.firstTimeLogin);
        sessionStorage.setItem('loginUser', JSON.stringify(this.bartender));
      }
    }
    else
      sessionStorage.setItem('loginUser', JSON.stringify({}));
  }

}
