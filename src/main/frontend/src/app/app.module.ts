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

import { FilterPipe } from './filter.pipe';
import { Filter2Pipe } from './filter2.pipe';
import { AddFriendComponent } from './components/user/add-friend/add-friend.component';

import { BasicGuestRestaurants } from './components/user/basicGuestRestaurants/basicGuestRestaurants.component';
import {UserService} from "./services/user/UserService";
import { BasicGuestFriendsComponent } from './components/user/basicGuestFriends/basicGuestFriends';

import {FriendService} from "./services/friend/FriendService";
import { ReserveRestComponent } from './components/user/basicGuestRestaurants/reserve-rest/reserve-rest.component';
import {FoodService} from "./services/food/FoodService";
import {DrinkService} from "./services/drink/DrinkService";
import {DrinkItemService} from "./services/drink/DrinkItemService";
import {VisitService} from "./services/visit/VisitService";
import {ScheduleTableView} from "./components/user/basicWaiterView/scheduleTableView/scheduleTableView.component";
import {SchedulerWorkService} from "./services/scheduler_work/SchedulerWorkService";



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
    BasicGuestRestaurants,
    BasicGuestFriendsComponent,
    BasicSupplierView,
        MyComponent,
        CalendarComponent,
        FilterPipe,
        Filter2Pipe,
        AddFriendComponent,




    MyComponent,
    OrdersWaiterView,
    ScheduleTableView,
    CalendarComponent,
    ReserveRestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginGuest},
      {path: 'register', component: RegisterGuest},
      {path: '', canActivate: [GuestLoginGuard], component: BasicGuestView},
      {path: 'guest/account', canActivate: [GuestLoginGuard], component: BasicGuestView},
      {path: 'guest/restaurants', component: BasicGuestRestaurants},
      {path: 'guest/friends', component: BasicGuestFriendsComponent},
      {path: 'waiter/account', canActivate: [EmployeeFirstLoginGuard], component: BasicWaiterView},
      {path: 'waiter/work', component: MyComponent},
      {path: 'waiter/orders', component: OrdersWaiterView},
      {path: 'waiter/schedule_table', component: ScheduleTableView},
      {path: 'cook/account', canActivate: [EmployeeFirstLoginGuard], component: BasicCookView},
      {path: 'bartender/account', canActivate: [EmployeeFirstLoginGuard], component: BasicBartenderView},
      {path: 'change/password', component: EmployeeChangePassword},
      {path: 'supplier/account', canActivate: [EmployeeFirstLoginGuard], component: BasicSupplierView},
      {path: 'guest/friends/add', component: AddFriendComponent},
      {path: 'guest/restaurants/reserve', component: ReserveRestComponent}



    ]),
    ImageUploadModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [GuestLoginGuard, EmployeeFirstLoginGuard,UserService,FriendService,FoodService,DrinkService,DrinkItemService,VisitService, SchedulerWorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }

