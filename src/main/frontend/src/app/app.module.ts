import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {LoginGuest} from "./components/user/loginGuest/loginGuest.component";
import {RouterModule} from "@angular/router";
import {BasicGuestView} from "./components/user/basicGuestView/basicGuestView.component";
import {StarComponent} from "./shared/star.component";
import {GuestLoginGuard} from "./services/user/GuestLoginGuard";
import {RegisterGuest} from "./components/user/registerGuest/registerGuest.component";
import {BasicWaiterView} from "./components/user/basicWaiterView/basicWaiterView.component";
import {BasicCookView} from "./components/user/basicCookView/basicCookView.component";
import {BasicBartenderView} from "./components/user/basicBartenderView/basicBartenderView.component";
import {EmployeeFirstLoginGuard} from "./services/user/EmployeeFirstLoginGuard";
import {EmployeeChangePassword} from "./components/user/employeeChangePassword/employeeChangePassword.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginGuest,
    RegisterGuest,
    BasicGuestView,
    StarComponent,
    BasicWaiterView,
    BasicCookView,
    BasicBartenderView,
    EmployeeChangePassword
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginGuest},
      {path: 'register', component: RegisterGuest},
      {path: '', canActivate: [GuestLoginGuard], component: BasicGuestView},
      {path: 'waiter/account', canActivate: [EmployeeFirstLoginGuard], component: BasicWaiterView},
      {path: 'cook/account', canActivate: [EmployeeFirstLoginGuard], component: BasicCookView},
      {path: 'bartender/account', canActivate: [EmployeeFirstLoginGuard], component: BasicBartenderView},
      {path: 'change/password', component: EmployeeChangePassword}
    ])
  ],
  providers: [GuestLoginGuard, EmployeeFirstLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
