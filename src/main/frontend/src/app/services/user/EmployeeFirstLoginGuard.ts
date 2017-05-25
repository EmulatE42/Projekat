import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Bartender, Cook, Role, Supplier, User, Waiter} from "../../models";

@Injectable()
export class EmployeeFirstLoginGuard implements CanActivate
{

  user : User;
  constructor(private router: Router) { }

  canActivate(): boolean
  {

    if(sessionStorage.getItem("loginUser") != null)
    {
       this.user = <User> JSON.parse(sessionStorage.getItem("loginUser"));
       if( Role[this.user.role] == Role.KONOBAR.toString()) {
          var waiter = <Waiter> this.user;
          if(waiter.firstTimeLogin === false) {
            this.router.navigate(['/change/password']);
            return false;
          }
          else
            return true;
      }
      else if( Role[this.user.role] == Role.KUVAR.toString()) {
         var cook = <Cook> this.user;
         if(cook.firstTimeLogin === false) {
           this.router.navigate(['/change/password']);
           return false;
         }
         else
           return true;
       }
       else if( Role[this.user.role] == Role.SANKER.toString()) {
         var bartender = <Bartender> this.user;
         if(bartender.firstTimeLogin === false) {
           this.router.navigate(['/change/password']);
           return false;
         }
         else
           return true;
       }
       else if( Role[this.user.role] == Role.PONUDJAC.toString()) {
         var supplier = <Supplier> this.user;
         if(supplier.firstTimeLogin === false) {
           this.router.navigate(['/change/password']);
           return false;
         }
         else
           return true;
       }
    }
    else {
        this.router.navigate(['/login']);
        return false;

    }
  }

}
