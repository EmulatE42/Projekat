import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user/UserService";
import {Bartender, Cook, Guest, Role, Supplier, User, Waiter} from "../../../models";

@Component({
  templateUrl: './employeeChangePassword.component.html',
  providers: [UserService],
})

export class EmployeeChangePassword{
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;

  controlMessage: boolean = true;
  user: User = JSON.parse(sessionStorage.getItem("loginUser"));
  waiter: Waiter;
  cook: Cook;
  bartender: Bartender;
  supplier: Supplier;

  constructor(
    private userService: UserService,
    private router: Router) { }

  save(): void
  {
    if(this.user.password === this.oldPassword)
    {
      //this.userService.login(this.email, this.password).subscribe(user => this.user = user, error => alert(error), () => this.com());
      if( Role[this.user.role] == Role.KONOBAR.toString()) {

        this.waiter = <Waiter> this.user;
        this.waiter.firstTimeLogin = true;
        this.waiter.password = this.newPassword1;
        sessionStorage.setItem("loginUser", JSON.stringify(this.waiter));
        this.userService.updateWaiterPassword(this.waiter.email, this.newPassword1).subscribe(user => this.user = user, error => alert(error))
        this.router.navigate(['../waiter/account']);
      }
      else if( Role[this.user.role] == Role.KUVAR.toString()) {

        this.cook = <Cook> this.user;
        this.cook.firstTimeLogin = true;
        this.cook.password = this.newPassword1;
        sessionStorage.setItem("loginUser", JSON.stringify(this.cook));
        this.userService.updateCookPassword(this.cook.email, this.newPassword1).subscribe(user => this.user = user, error => alert(error))
        this.router.navigate(['../cook/account']);
      }
      else if( Role[this.user.role] == Role.SANKER.toString()) {

        this.bartender = <Bartender> this.user;
        this.bartender.firstTimeLogin = true;
        this.bartender.password = this.newPassword1;
        sessionStorage.setItem("loginUser", JSON.stringify(this.bartender));
        this.userService.updateBartenderPassword(this.bartender.email, this.newPassword1).subscribe(user => this.user = user, error => alert(error))
        this.router.navigate(['../bartender/account']);
      }
      else if( Role[this.user.role] == Role.PONUDJAC.toString()) {

        this.supplier = <Supplier> this.user;
        this.supplier.firstTimeLogin = true;
        this.supplier.password = this.newPassword1;
        sessionStorage.setItem("loginUser", JSON.stringify(this.supplier));
        this.userService.updateSupplierPassword(this.supplier.email, this.newPassword1).subscribe(user => this.user = user, error => alert(error))
        this.router.navigate(['../supplier/account']);
      }
    }
    else {
      alert("Lozinke se ne poklapaju!");
      this.controlMessage = false;
      document.getElementById("changePass").innerHTML = "<div class=\"alert alert-danger col-sm-offset-4 col-sm-4\"> Wrong old password! </div>";

    }

  }

  isValidForm(): boolean
  {
    if(this.newPassword1 == this.newPassword2 && this.newPassword1 && this.newPassword2 && this.controlMessage) {
      document.getElementById("changePass").innerHTML = "<div class=\"alert alert-success col-sm-offset-4 col-sm-4\"> New passwords match! </div>";
      return true;
    }
    else if((this.newPassword1 || this.newPassword2) && this.controlMessage) {
      document.getElementById("changePass").innerHTML = "<div class=\"alert alert-danger col-sm-offset-4 col-sm-4\"> New passwords do not match! </div>";
      return false;
    }
    else
      return true;
  }

  valuechange(newValue) {
    if(this.newPassword1 != newValue || this.newPassword2 != newValue)
      this.controlMessage = true;
  }

}
