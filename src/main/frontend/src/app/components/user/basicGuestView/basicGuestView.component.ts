import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";
import * as firebase from 'firebase'
@Component({
  templateUrl: './basicGuestView.component.html',
  styleUrls: ['./basicGuestView.component.css'],
  providers: [RestaurantService]
})

export class BasicGuestView implements OnInit{


  guest: Guest = JSON.parse(sessionStorage.getItem("loginUser"));
  firstname: string;
  lastname: string;
  adresa: string;


  firstname_save: string;
  lastname_save: string;
  adresa_save: string ;


  edit: boolean = true;
  avatar: string;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.firstname = this.guest.first_name;
    this.lastname = this.guest.last_name;
    this.adresa = this.guest.adresa;

    if(this.guest.avatar === null)
    {
      const storageRef = firebase.storage().ref().child('images/default-profile.png');
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }
    else {
      const storageRef = firebase.storage().ref().child('images/' + this.guest.avatar);
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }

    this.saveData();

  }
  saveData(): void
  {
    this.firstname_save = this.firstname;
    this.lastname_save = this.lastname;
    this.adresa_save = this.adresa;
  }


  update(): void {
    this.guest.first_name = this.firstname;
    this.guest.last_name = this.lastname;
    this.guest.adresa = this.adresa;


    this.userService.updateGuest(this.guest).subscribe(guest => console.log(guest));
    sessionStorage.setItem("loginUser", JSON.stringify(this.guest));
    this.isEdit();
    this.saveData();
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
    this.adresa = this.adresa_save;


    //alert("Nova vrednost: " + this.firstname_save);
    this.isEdit();
  }

  changePassword(): void{
    this.router.navigate(['../change/password']);

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

      this.guest.avatar = filename;
      sessionStorage.setItem('loginUser', JSON.stringify(this.guest));
      this.userService.updateGuest(this.guest).subscribe(guest => console.log(guest));

      uploadTask.on('state_changed', function(snapshot){

      }, function(error){

      }, function () {

        const storageRef = firebase.storage().ref().child('images/' + filename);
        storageRef.getDownloadURL().then(url => this.avatar = url);

      });

    }
  }
}
