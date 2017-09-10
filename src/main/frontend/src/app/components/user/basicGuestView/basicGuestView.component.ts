import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant, Visit} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";
import {UserService} from "../../../services/user/UserService";

import * as firebase from 'firebase'
import {VisitService} from "../../../services/visit/VisitService";

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

  poseta : Visit;
  posete : Visit[] = [];
  rating : number = 0;
  menjanje : boolean[] = [];
  trenutni : number ;

  constructor(private visitService : VisitService, private userService: UserService, private router: Router) {
    this.visitService.getAllVisitForOne()
      .subscribe(guests => this.posete = guests,error => console.log("Error: ", error),() =>this.vidi());


  }
  vidi () : void
  {
    for (var i = 0 ; i < this.posete.length;i++)
    {
     // alert("PETLJAAAA");
      if (this.posete[i].ocena == 0)
      {
       // alert("OVAJ ID DOBIO TRUE " + i);
        this.menjanje[i] = true;
      }
      else {
       // alert("OVAJ ID DOBIO false " + i);
        this.menjanje[i] = false;
      }
    }
  }
  un (b : number) : void
  {
    //alert("MOJEEE");
    this.trenutni = b;
  }
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

    addEventListener('click', (event: Event) => {

     // alert("CLICK xD");
      var logo = document.getElementById('PERA'+this.trenutni);
      var logoTextRectangle = logo.getBoundingClientRect();

     // alert("logo's left pos.:" + logoTextRectangle.left);
     // alert("logo's right pos.:" + logoTextRectangle.top);
      var x = (event as any).pageX ;
      var y  = (event as any).pageY;
      var
        z = x + " " + y;
      //if ( y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
      //alert("Y JE " + y + " X JE " + x + " logoTextRectangle.top je " + logoTextRectangle.top + " logoTextRectangle.left je " + logoTextRectangle.left);
      if ( y > logoTextRectangle.top && y < logoTextRectangle.top + 20 && x > logoTextRectangle.left && x < logoTextRectangle.left + 86)
      {

        //17.2 + 34.4 + 51.6 + 68.8 + 86
        var razlika = x - logoTextRectangle.left;
      //  alert("RAZ JE " + razlika);
        if (razlika < 17.2)
        {
          this.posete[this.trenutni].ocena = 1;
        }
        else if ( razlika < 34.4)
        {
          this.posete[this.trenutni].ocena = 2;
        }
        else if ( razlika < 51.6)
        {
          this.posete[this.trenutni].ocena = 3;
        }
        else if ( razlika < 68.8)
        {
          this.posete[this.trenutni].ocena = 4;
        }
        else
        {
          this.posete[this.trenutni].ocena = 5;
        }

      }
      else
      {
       // alert("NIJE");
      }
    });

    //alert("GOTOV INIT");
  }
  saveData(): void
  {
    this.firstname_save = this.firstname;
    this.lastname_save = this.lastname;
    this.adresa_save = this.adresa;
  }
  uneoOcenu(broj : number) : void
  {
    console.log("USAO SAM " + broj);
    for ( var i = 0 ; i < this.posete.length; i++)
    {
      if (i == broj)
      {
        console.log("USAO SAM BAS BAS" + i);
        this.posete[i].gotov = 1;
        this.menjanje[i] = false;
        this.visitService.izmeniPosetu(this.posete[i].id,this.posete[i].ocena).subscribe(h => this.poseta = h,error => console.log("Error: ", error),() =>this.aaa());
        var element = document.getElementById('PERA'+broj);
        element.setAttribute("mvp", "2");
      }
    }


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

      uploadTask.on('state_changed', { next: function(snapshot){

      }, error: function(error){

      }, complete: function () {

        const storageRef = firebase.storage().ref().child('images/' + filename);
        storageRef.getDownloadURL().then(url => this.avatar = url);

      }});

    }
  }

  private aaa() {
    this.visitService.getAllVisitForOne()
      .subscribe(guests => this.posete = guests,error => console.log("Error: ", error),() =>this.vidi());
  }
}
