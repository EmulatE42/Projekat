import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class GuestLoginGuard implements CanActivate
{
  constructor(private router: Router) { }

    canActivate(): boolean
    {
      if(sessionStorage.getItem("loginUser") != null) // OVDE DEDA // da li je potvrdio na mailu
      {
        //sessionStorage.getItem("loginUser")
        var obje = JSON.parse(sessionStorage.loginUser); // JSON.parse(localStorage.getItem("loggedUser")).email;
        console.log("OVO JE email NEJGOV" + obje.email );
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    }

}
