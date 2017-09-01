import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Bartender, Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";
import * as firebase from 'firebase'

@Component({
  templateUrl: './basicBartenderView.component.html',
  styleUrls: ['./basicBartenderView.component.css'],
  providers: [UserService]
})

export class BasicBartenderView implements OnInit{

  bartender: Bartender = JSON.parse(sessionStorage.getItem("loginUser"));
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



  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.firstname = this.bartender.first_name;
    this.lastname = this.bartender.last_name;
    this.formatDate(this.bartender.birth);
    this.dressSize = this.bartender.dressSize;
    this.shoeSize = this.bartender.shoeSize;

    if(this.bartender.avatar === null)
    {
      const storageRef = firebase.storage().ref().child('images/default-profile.png');
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }
    else {
      const storageRef = firebase.storage().ref().child('images/' + this.bartender.avatar);
      storageRef.getDownloadURL().then(url => this.avatar = url);
    }

    this.saveData()

  }

  update(): void {
    this.bartender.first_name = this.firstname;
    this.bartender.last_name = this.lastname;
    this.bartender.birth = this.birth;
    this.bartender.dressSize = this.dressSize;
    this.bartender.shoeSize = this.shoeSize;

    this.userService.updateBartender(this.bartender).subscribe(bartender => console.log(bartender));
    sessionStorage.setItem("loginUser", JSON.stringify(this.bartender));
    this.isEdit();
    this.saveData()
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

      this.bartender.avatar = filename;
      sessionStorage.setItem('loginUser', JSON.stringify(this.bartender));
      this.userService.updateBartender(this.bartender).subscribe(bartender => console.log(bartender));

      uploadTask.on('state_changed', { next: function(snapshot){

      }, error: function(error){

      }, complete: function () {

        const storageRef = firebase.storage().ref().child('images/' + filename);
        storageRef.getDownloadURL().then(url => this.avatar = url);

      }});

    }
  }


}
