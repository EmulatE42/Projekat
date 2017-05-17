import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class GuestLoginGuard implements CanActivate
{
  constructor(private router: Router) { }

    canActivate(): boolean
    {
      if(sessionStorage.getItem("loginGuest") != null)
        return true;
      else {
        this.router.navigate(['/guest/login']);
        return false;
      }
    }

}