import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Bartender, Cook, Guest, Role, SuperUser, Supplier, User, Waiter} from "../../../models";

@Component({
  templateUrl: './loginGuest.component.html',
  providers: [UserService],
})

export class LoginGuest implements OnInit{
  email: string;
  password: string;

  user: User;
  guest: Guest;
  waiter: Waiter;
  cook: Cook;
  bartender: Bartender;
  supplier: Supplier;


  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit()
  {

  }

  login(): void
  {
    this.userService.login(this.email, this.password).subscribe(user => this.converte(<SuperUser> user), error => alert(error), () => this.com());
  }

  com(): void
  {
    this.user = JSON.parse(sessionStorage.getItem("loginUser"));
    if(JSON.stringify(this.user) !== '{}') {

      if( Role[this.user.role] == Role.GOST.toString()) {
        var sing_up = document.getElementById("sing_up");
        var login = document.getElementById("login");

        if(sing_up != null && login != null)
        {
          this.removeChild(sing_up);
          this.removeChild(login);
        }

        document.getElementById("icon").innerHTML = "<a class=\"dropdown-toggle\"data-toggle=\"dropdown\" href=\"#\"><img width=\"26\" height=\"26\" class=\"img-circle\" src=\"https://gitlab.com/uploads/user/avatar/887661/avatar.png\" alt=\"Avatar\"><span class=\"caret\"></span></a><ul class=\"dropdown-menu\"><li><a id=\"logout\" href=\"#\">Log out</a></li></ul>";
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
      else if( Role[this.user.role] == Role.PONUDJAC.toString()) {
        this.router.navigate(['../supplier/account']);
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
      else if( Role[user.role] == Role.PONUDJAC.toString()) {
        this.supplier = new Supplier(user.id, user.first_name, user.last_name, user.email, user.password, user.role, user.avatar, user.birth, user.firstTimeLogin);
        sessionStorage.setItem('loginUser', JSON.stringify(this.supplier));
      }
    }
    else
      sessionStorage.setItem('loginUser', JSON.stringify({}));
  }

  removeChild(node): void{
    while(node.hasChildNodes())
    {
      node.removeChild(node.firstChild);
    }
  }

}
