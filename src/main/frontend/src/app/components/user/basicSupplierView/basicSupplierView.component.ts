import {Component, Inject, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant, Supplier, Waiter} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";
import * as firebase from 'firebase'
//import {$WebSocket} from 'angular2-websocket/angular2-websocket'



@Component({
  templateUrl: './basicSupplierView.component.html',
  styleUrls: ['./basicSupplierView.component.css'],
  providers: [UserService]
})

export class BasicSupplierView implements OnInit{

  supplier: Supplier = JSON.parse(sessionStorage.getItem("loginUser"));
  firstname: string;
  lastname: string;
  birth: string;


  firstname_save: string;
  lastname_save: string;
  birth_save: string ;

  edit: boolean = true;
  avatar: string;



  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.firstname = this.supplier.first_name;
    this.lastname = this.supplier.last_name;
    this.formatDate(this.supplier.birth);


    if(this.supplier.avatar === null)
    {
      const storageRef = firebase.storage().ref().child('images/default-profile.png');
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }
    else {
      const storageRef = firebase.storage().ref().child('images/' + this.supplier.avatar);
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }

    this.saveData();

  }

  update(): void {
    this.supplier.first_name = this.firstname;
    this.supplier.last_name = this.lastname;
    this.supplier.birth = this.birth;

    this.userService.updateSupplier(this.supplier).subscribe(waiter => console.log(waiter));
    sessionStorage.setItem("loginUser", JSON.stringify(this.supplier));
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

      this.supplier.avatar = filename;
      sessionStorage.setItem('loginUser', JSON.stringify(this.supplier));
      this.userService.updateSupplier(this.supplier).subscribe(waiter => console.log(waiter));

      uploadTask.on('state_changed', function(snapshot){

      }, function(error){

      }, function () {

        const storageRef = firebase.storage().ref().child('images/' + filename);
        storageRef.getDownloadURL().then(url => this.avatar = url);

      });

    }
  }


}
