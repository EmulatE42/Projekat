import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FoodService} from "../../../../services/food/FoodService";
import {Drink, Food, Order, OrderDrink, OrderDrinkItem, OrderFood, Visit} from "../../../../models";
import {DrinkService} from "../../../../services/drink/DrinkService";
import {VisitService} from "../../../../services/visit/VisitService";
import {OrderService} from "../../../../services/order/OrderService";

@Component({
  selector: 'app-reserve-rest',
  templateUrl: './reserve-rest.component.html',
  styleUrls: ['./reserve-rest.component.css']
})
export class ReserveRestComponent implements OnInit {


  public myDate: Date;
  public myTime: number = -1;
  public myHour: number;
  public konacnoVreme : string;

  private imeRestorana : string;
  private foods : Food[];
  private drinks : Drink[];

  private selectedFoods = new Array<Food>();
  private selectedDrinks = new Array<Drink>();
  private order: Order;
  private order_food: OrderFood;
  private order_drink: OrderDrink;

  private poslednji: OrderDrinkItem;
  private vracenaPica: OrderDrinkItem[] = [];

  private poseta: Visit;
  private uneti : number[] = [];
  private danasnji : number[] = [];
  private dobar: boolean = false;
  constructor(private r: Router,private vs : VisitService, private drinkService: DrinkService, private  foodService : FoodService, private router: ActivatedRoute,private orderService: OrderService) {
    this.foodService.getAllFood()
    .subscribe(h => this.foods = h );

    this.drinkService.getAllDrink()
      .subscribe(h => this.drinks = h );
  }

  public napraviDatum(s: string) : number[]
  {
    var niz = s.split("-");
    var temp = [];
    for (var i=0; i<niz.length; i++)
    {
      temp[i] = parseInt(niz[i], 10);
    }
    return temp.reverse();
  }
  public pogresanUnos(uneo: number[],danas : number[]) : boolean
  {
    var u = uneo[0] * 100 + uneo[1] * 10000 + uneo[2] * 1000000;
    var d = danas[0] * 100 + danas[1] * 10000 + danas[2] * 1000000;

    if ( u >= d )
    {
      console.log("u je " + u + " d je " + d);
      return false;
    }
    return true;
  }

  public onChange(n : number) : void
  {
    this.myHour = n;
  }

  public onInputTime(v : number) : void {
    this.myTime = v;
  console.log("UNELI aaa STE VREME " + (this.myTime) );

}

  public onInput(value: Date): void{

    this.myDate = value;
    console.log("ODABRAO SI" + this.myDate.toString());

    var date = new Date();
    console.log(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
    var uneo = this.myDate.toString();
    var danasnji = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.uneti = this.napraviDatum(uneo);
    this.danasnji = this.napraviDatum(danasnji);
    if ( this.pogresanUnos(this.uneti,this.danasnji))
    {
      document.getElementById("LOL").innerHTML = "<div class=\"alert alert-danger \">  <p >Los datum</p>  </div>";
      this.dobar = false;
    }
    else
    {
      document.getElementById("LOL").innerHTML ="";
      this.dobar = true;
    }

  }

  ngOnInit() {
    this.router
      .queryParams
      .subscribe(params => {
        this.imeRestorana = params['ime_Restorana'];
      });



    console.log("SELEKTOVAO SI INIIIT " + this.imeRestorana);
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



  addOrderItem(): void{
    let order = new Order(null, [6,9], this.imeRestorana, this.konacnoVreme);
    this.orderService.addOrder(order).subscribe(data => this.order = data,
      error => console.log("Error: ", error),
      () => this.addOrderFood());

  }

  addOrderFood(): void
  {
    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      var order_food = new OrderFood(null, this.selectedFoods[i], this.order);
      this.orderService.addOrderFood(order_food).subscribe(data => this.order_food = data);
    }
    this.addOrderDrink();
  }

  addOrderDrink(): void
  {
    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      var order_drink = new OrderDrink(null, this.selectedDrinks[i], this.order);
      this.orderService.addOrderDrink(order_drink).subscribe(data => this.order_drink = data);
    }

  }


  addFood(id: string): void{
 this.selectedFoods.push(this.findFood(id));

  }

  addDrink(id: string): void{
 this.selectedDrinks.push(this.findDrink(id));
  }

  zavrsiPorudzbinu() : void{
    if (this.dobar && !(this.myTime == -1)) {
      document.getElementById("naKraju").innerHTML = "<div class=\" alert alert-success col-sm-1\"> Uspesan unos </div>";

      this.konacnoVreme = this.uneti[0]+"." + this.uneti[1] + "." + this.uneti[2] + "." + " " + this.myTime + " " + this.obrada(this.myTime);
        this.addOrderItem();
      this.vs.dodajPosetu(JSON.parse(sessionStorage.getItem("loginUser")).email, this.imeRestorana, "Nesto xD").subscribe(h => this.poseta = h,error => console.log("Error: ", error),
        () => this.kraj());

    }

  }
public obrada(vreme: number) : string
{
  var t = vreme.toString();
  var a = t.split(":");
  var z = +a[0];
  var x = +this.myHour;
  var v = (z + x);
  var rez = v+":"+a[1];
  return rez;
}
public kraj () : void
{

  this.sleep(2);
  this.r.navigate(['../']);
}
  public sleep(seconds) : void
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}
}
