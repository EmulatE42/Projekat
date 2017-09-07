import { Component, OnInit } from '@angular/core';
import {Guest, Invite} from "../../../models";
import {InviteService} from "../../../services/invite/InviteService";
import {FriendService} from "../../../services/friend/FriendService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-received-invites',
  templateUrl: './received-invites.component.html',
  styleUrls: ['./received-invites.component.css']
})
export class ReceivedInvitesComponent implements OnInit {

  public poslatiPozivi : Invite[] = [];
  public sviGosti : Guest[] = [];
  public imena : string[] = [];
  public prezimena : string[] = [];
  private errorMessage: string = "Doslo je do greske!";
  private poslednjiInvite : Invite;
  constructor( private router: Router,private inviteService : InviteService, private friendService :FriendService) {

    this.inviteService.getPrimljenePozive()
      .subscribe(guests => this.poslatiPozivi = guests,
        error => this.errorMessage = <any>error);

  }

ngOnInit() {

  }
  prihvatiPoziv(prvi: string, drugi: string, treci : number, imeRestorana : string, datum: string) : void
  {
    var x = imeRestorana.split(";")[0];
    this.router.navigate(['/guest/receivedInvites/addSomeFoodandDrinks'] ,{queryParams: {prvi: prvi , drugi: drugi, treci: treci, imeRestorana: x, datum: datum}} );

    //this.inviteService.obrisiPoziv(prvi,drugi,treci).subscribe(f => this.poslednjiInvite = f,error => this.errorMessage = <any>error, () => this.osvezavamoxD);
  }
  odbijPoziv(prvi: string, drugi: string, treci : number) : void
  {
    this.inviteService.obrisiPoziv(prvi,drugi,treci).subscribe(f => this.poslednjiInvite = f,error => this.errorMessage = <any>error, () => this.osvezavamoxD);
  }

  findName(data: string): string{
    var f = null;
    this.sviGosti.forEach(function(g) {
      if(g.email ==data) {
        f = g.first_name;
        return f;
      }
    });
    return f;

  }

  findLastName(data: string): string{
    var f = null;
    this.sviGosti.forEach(function(g) {
      if(g.email ==data) {
        f = g.last_name;
        return f;
      }
    });
    return f;

  }


  prihvatio( g: Guest) : void
  {

  //  this.friendService.dodajPrijateljstvo(g.email,JSON.parse(sessionStorage.getItem("loginUser")).email).subscribe(f => this.fa = f,error => this.errorMessage = <any>error);
   // this.obrisi(g);
  }

  osvezavamoxD() : void {

    this.inviteService.getPrimljenePozive()
      .subscribe(guests => this.poslatiPozivi = guests,
        error => this.errorMessage = <any>error);
  }



}
