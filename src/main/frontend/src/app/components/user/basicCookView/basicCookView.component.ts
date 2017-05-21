import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Cook, Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";
import * as firebase from 'firebase'

@Component({
  templateUrl: './basicCookView.component.html',
  styleUrls: ["./basicCookView.component.css"],
  providers: [UserService]
})

export class BasicCookView implements OnInit{


  cook: Cook = JSON.parse(sessionStorage.getItem("loginUser"));
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
    this.firstname = this.cook.first_name;
    this.lastname = this.cook.last_name;
    this.formatDate(this.cook.birth);
    this.dressSize = this.cook.dressSize;
    this.shoeSize = this.cook.shoeSize;

    if(this.cook.avatar === null)
    {
      const storageRef = firebase.storage().ref().child('images/default-profile.png');
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }
    else {
      const storageRef = firebase.storage().ref().child('images/' + this.cook.avatar);
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }

    this.saveData();

  }

  update(): void {
    this.cook.first_name = this.firstname;
    this.cook.last_name = this.lastname;
    this.cook.birth = this.birth;
    this.cook.dressSize = this.dressSize;
    this.cook.shoeSize = this.shoeSize;

    this.userService.updateCook(this.cook).subscribe(cook => console.log(cook));
    sessionStorage.setItem("loginUser", JSON.stringify(this.cook));
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

      this.cook.avatar = filename;
      alert('Avatar: ' + this.cook.avatar);
      sessionStorage.setItem('loginUser', JSON.stringify(this.cook));
      this.userService.updateCook(this.cook).subscribe(cook => console.log(cook));

      uploadTask.on('state_changed', function(snapshot){

        }, function(error){

        }, function () {

            const storageRef = firebase.storage().ref().child('images/' + filename);
            storageRef.getDownloadURL().then(url => this.avatar = url);

        });

    }
  }
}

























