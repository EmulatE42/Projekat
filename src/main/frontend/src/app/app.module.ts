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
import {ImageUploadModule} from "angular2-image-upload";
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";
import * as firebase from 'firebase';
import {CalendarComponent} from "ap-angular2-fullcalendar";
import {MyComponent} from "app/components/user/waiterWorkShedulesView/waiterWorkShedulesView.component";
import {BasicSupplierView} from "./components/user/basicSupplierView/basicSupplierView.component";
import {OrdersWaiterView} from "./components/user/basicWaiterView/ordersView/ordersView.component";

firebase.initializeApp(firebaseConfig);

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
    BasicSupplierView,
    EmployeeChangePassword,
    MyComponent,
    OrdersWaiterView,
    CalendarComponent
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
      {path: 'waiter/work', component: MyComponent},
      {path: 'waiter/orders', component: OrdersWaiterView},
      {path: 'cook/account', canActivate: [EmployeeFirstLoginGuard], component: BasicCookView},
      {path: 'bartender/account', canActivate: [EmployeeFirstLoginGuard], component: BasicBartenderView},
      {path: 'supplier/account', canActivate: [EmployeeFirstLoginGuard], component: BasicSupplierView},
      {path: 'change/password', component: EmployeeChangePassword}
    ]),
    ImageUploadModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [GuestLoginGuard, EmployeeFirstLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

