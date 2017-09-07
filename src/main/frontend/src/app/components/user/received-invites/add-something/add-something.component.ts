import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Drink, Food, Invite, Order, OrderDrink, OrderFood, Visit} from "../../../../models";
import {FoodService} from "../../../../services/food/FoodService";
import {DrinkService} from "../../../../services/drink/DrinkService";
import {InviteService} from "../../../../services/invite/InviteService";
import {VisitService} from "../../../../services/visit/VisitService";
import {OrderService} from "../../../../services/order/OrderService";

@Component({
  selector: 'app-add-something',
  templateUrl: './add-something.component.html',
  styleUrls: ['./add-something.component.css']
})
export class AddSomethingComponent implements OnInit {

  public prvi: string;
  public drugi: string;
  public treci: string;
  public imeRestorana : string;
  public datum : string;


  private selectedFoods  = new Array<Food>();
  private selectedDrinks= new Array<Drink>();

  private foods : Food[];
  private drinks : Drink[];
  private poslednjiInvite: Invite;
  private poslednjiVisit : Visit;

  private order_drink : OrderDrink;
  private order_food : OrderFood;
  private ord : Order;

  constructor(private r: Router ,private orderService : OrderService, private vs : VisitService, private inviteService : InviteService, private router: ActivatedRoute, private  foodService : FoodService, private drinkService : DrinkService) {
    this.router
    .queryParams
    .subscribe(params => {
      this.prvi = params['prvi']; this.drugi = params["drugi"]; this.treci = params["treci"]; this.imeRestorana = params["imeRestorana"]; this.datum = params["datum"];
    });

    this.foodService.getAllFood()
      .subscribe(h => this.foods = h );

    this.drinkService.getAllDrink()
      .subscribe(h => this.drinks = h );

    this.orderService.getById(this.treci).subscribe(h => this.ord = h);

  }

  ngOnInit() {

  }

  addFood(id: string): void{

    this.selectedFoods.push(this.findFood(id));

  }

  addDrink(id: string): void{
    this.selectedDrinks.push(this.findDrink(id));
  }
  findFood(data: string): Food{
    var f = null;
    this.foods.forEach(function(food) {
      if(food.name.localeCompare(data) === 0) {
        f = food;
        return f;
      }
    });
    return f;

  }

  findDrink(data: string): Drink{
    var f = null;
    this.drinks.forEach(function(drink) {
      if(drink.name.localeCompare(data) === 0) {
        f = drink;
        return f;
      }
    });
    return f;

  }

  zavrsiPorudzbinu() : void
  {
    //console.log("USAO mozda ?");
   // alert("ZA OVAJ ID " + this.treci + " order je " + this.ord.id + " rest je " + this.ord.nazivRestorana);
    if (this.selectedFoods.length != 0 || this.selectedDrinks.length !=0) {
      document.getElementById("naKraju").innerHTML = "<div class=\" alert alert-success col-sm-1\"> Uspesan unos </div>";
      this.addOrderFood();
      this.inviteService.obrisiPoziv(this.prvi, this.drugi, parseInt(this.treci, 10)).subscribe(f => this.poslednjiInvite = f);
      this.vs.dodajPosetu(JSON.parse(sessionStorage.getItem("loginUser")).email, this.imeRestorana,  this.datum).subscribe(h => this.poslednjiVisit = h,error => console.log("Error: ", error),
        () => this.kraj());

    }
  }

  addOrderFood(): void
  {
    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      var order_food = new OrderFood(null, this.selectedFoods[i], this.ord,false,false);
      this.orderService.addOrderFood(order_food).subscribe(data => this.order_food = data);
    }
    this.addOrderDrink();
  }

  addOrderDrink(): void
  {
    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      var order_drink = new OrderDrink(null, this.selectedDrinks[i], this.ord,false);
      this.orderService.addOrderDrink(order_drink).subscribe(data => this.order_drink = data);
    }

  }


  private kraj() {
    this.sleep(2);

    this.r.navigate(['../']);
  }
  public sleep(seconds) : void
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }
}
