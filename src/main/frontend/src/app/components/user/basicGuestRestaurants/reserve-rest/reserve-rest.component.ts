import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FoodService} from "../../../../services/food/FoodService";
import {Drink, Food, OrderDrinkItem, Visit} from "../../../../models";
import {DrinkService} from "../../../../services/drink/DrinkService";
import {DrinkItemService} from "../../../../services/drink/DrinkItemService";
import {VisitService} from "../../../../services/visit/VisitService";

@Component({
  selector: 'app-reserve-rest',
  templateUrl: './reserve-rest.component.html',
  styleUrls: ['./reserve-rest.component.css']
})
export class ReserveRestComponent implements OnInit {

  private dat : string;
  onEnter(dat: string) { this.dat = dat; }

  private imeRestorana : string;
  private hrana : Food[];
  private pica : Drink[];

  private odabranaHrana: Food[] = [];
  private odabranaPica: Drink[] = [];


  private poslednji: OrderDrinkItem;
  private vracenaPica: OrderDrinkItem[] = [];

  private poseta: Visit;

  constructor(private vs : VisitService, private  dis : DrinkItemService, private drinkService: DrinkService, private  foodService : FoodService, private router: ActivatedRoute) {
    this.foodService.getAllFood()
    .subscribe(h => this.hrana = h );

    this.drinkService.getAllDrink()
      .subscribe(h => this.pica = h );

  }

  ngOnInit() {

    this.router
      .queryParams
      .subscribe(params => {
        this.imeRestorana = params['ime_Restorana'];
      });



    console.log("SELEKTOVAO SI INIIIT " + this.imeRestorana);
  }

  dodajFood(h: Food): void{
    this.odabranaHrana.push(h);
    console.log("BROJ ODABRANE HRANE je " + this.odabranaHrana.length);
    var listOfFoods = document.getElementById("foods_id");
    listOfFoods.innerHTML = listOfFoods.innerHTML + "<li class=\"list-group-item\">"+ h.name + "<div class=\"pull-right action-buttons\">  </div> </li>";
  }

  dodajDrink(d: Drink): void{
    this.odabranaPica.push(d);
    console.log("BROJ ODABRANIH PICA je " + this.odabranaPica.length);
    var listOfDrinks = document.getElementById("drinks_id");
    listOfDrinks.innerHTML = listOfDrinks.innerHTML + "<li class=\"list-group-item\">"+ d.name + "<div class=\"pull-right action-buttons\">  </div> </li>";
  }


  zavrsiPorudzbinu() : void{
    var odi = new OrderDrinkItem(null,this.odabranaPica,this.imeRestorana);

    this.dis.sacuvajOrderDrinkItem(odi)
      .subscribe(h => this.poslednji = h , error2 => this.pass(), () => this.asd());

  }

  asd() : void
  {
    this.dis.getAll()
      .subscribe(restaurants => this.vracenaPica = restaurants);

    console.log("UNEOOOO SIII DATUMM " + this.dat);
    this.vs.dodajPosetu(JSON.parse(sessionStorage.getItem("loginUser")).email,this.imeRestorana,this.dat)
      .subscribe(h => this.poseta = h );
  }
  pass() : void
  {

  }
}
