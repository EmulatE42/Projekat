import {Component, Inject, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant, Waiter} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";
import * as firebase from 'firebase'
//import {$WebSocket} from 'angular2-websocket/angular2-websocket'



@Component({
  templateUrl: './basicWaiterView.component.html',
  styleUrls: ['./basicWaiterView.component.css'],
  providers: [UserService]
})

export class BasicWaiterView implements OnInit{

  waiter: Waiter = JSON.parse(sessionStorage.getItem("loginUser"));
  firstname: string;
  lastname: string;
  birth: string;
  dressSize: number;
  shoeSize: number;

  firstname_save: string;
  lastname_save: string;
  birth_save: string ;
  dressSize_save: number;
  shoeSize_save: number;

  edit: boolean = true;
  avatar: string;



  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.firstname = this.waiter.first_name;
    this.lastname = this.waiter.last_name;
    this.formatDate(this.waiter.birth);
    this.dressSize = this.waiter.dressSize;
    this.shoeSize = this.waiter.shoeSize;

    if(this.waiter.avatar === null)
    {
      const storageRef = firebase.storage().ref().child('images/default-profile.png');
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }
    else {
      const storageRef = firebase.storage().ref().child('images/' + this.waiter.avatar);
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }

    this.saveData();
    //var ws = new $WebSocket("ws://localhost:8090/counter");

    /*ws.onOpen(event)
    {
      alert("Usao");
    }*/


  }

  update(): void {
    this.waiter.first_name = this.firstname;
    this.waiter.last_name = this.lastname;
    this.waiter.birth = this.birth;
    this.waiter.dressSize = this.dressSize;
    this.waiter.shoeSize = this.shoeSize;

    this.userService.updateWaiter(this.waiter).subscribe(waiter => console.log(waiter));
    sessionStorage.setItem("loginUser", JSON.stringify(this.waiter));
    this.isEdit();
    this.saveData();
  }

  formatDate(date): void {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

    this.birth = [year, month, day].join('-');
  }

  isEdit(): void
  {
    if(this.edit)
      this.edit = false;
    else
      this.edit = true;

  }

  cancle(): void
  {
    this.firstname = this.firstname_save;
    this.lastname = this.lastname_save;
    this.birth = this.birth_save;
    this.dressSize = this.dressSize_save;
    this.shoeSize = this.shoeSize_save;

    //alert("Nova vrednost: " + this.firstname_save);
    this.isEdit();
  }

  changePassword(): void{
    this.router.navigate(['../change/password']);

  }

  saveData(): void
  {
    this.firstname_save = this.firstname;
    this.lastname_save = this.lastname;
    this.birth_save = this.birth;
    this.dressSize_save = this.dressSize;
    this.shoeSize_save = this.shoeSize;
  }

  previewFile(): void {

    var preview = document.querySelector('img'); //selects the query named img
    var file = (<HTMLInputElement>document.querySelector('input[type=file]')).files[0]; //sames as here

    var reader  = new FileReader();
    var image;

    reader.onloadend = function () {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);

      var filename = file.name;
      var storageRef = firebase.storage().ref('/images/' + filename);
      var uploadTask = storageRef.put(file);

      this.waiter.avatar = filename;
      sessionStorage.setItem('loginUser', JSON.stringify(this.waiter));
      this.userService.updateWaiter(this.waiter).subscribe(waiter => console.log(waiter));

      uploadTask.on('state_changed', { next: function(snapshot){

      }, error: function(error){

      }, complete: function () {

        const storageRef = firebase.storage().ref().child('images/' + filename);
        storageRef.getDownloadURL().then(url => this.avatar = url);

      }});

    }
  }


}
