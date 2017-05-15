import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProbaComponent } from './proba/proba.component';
import {LoginGuest} from "./components/user/loginGuest/loginGuest.component";
import {RouterModule} from "@angular/router";
import {BasicGuestView} from "./components/user/basicGuestView/basicGuestView.component";
import {StarComponent} from "./shared/star.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginGuest,
    BasicGuestView,
    StarComponent,
    ProbaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'guest/login', component: LoginGuest},
      {path: '', component: BasicGuestView}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
