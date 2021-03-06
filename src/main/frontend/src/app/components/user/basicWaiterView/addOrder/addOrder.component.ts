import {
  AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ComponentRef, Input,
  ViewContainerRef, Compiler, ComponentFactoryResolver, Type
} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter, OrderFood, OrderDrink, NewUser} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import {FoodService} from "../../../../services/food/FoodService";
import {DrinkService} from "../../../../services/drink/DrinkService";



@Component({
  templateUrl: './addOrder.component.html',
  styleUrls: ['./addOrder.component.css'],
  providers: [UserService, OrderService]
})

export class AddOrderView implements OnInit{

  waiter: Waiter = JSON.parse(sessionStorage.getItem("loginUser"));

  foods: Food[] = null;
  drinks: Drink[] = null;
  selectedFoods: Food[];
  selectedDrinks: Drink[];
  orders: Order[] = null;
  newFood: Food;
  errorMessage: string;
  order: Order;
  order_food: OrderFood;
  order_drink: OrderDrink;
  user: NewUser;
  listOfFoods: any;

  add_order: boolean = false;
  brHrane: number;
  brPica: number;


  public myDate: Date;
  public myTime: number = -1;
  public myHour: number;
  public bojeStolova : string[] = [];
  public size : number = 75;
  public razmak : number =50;
  public elements : any[] = [];
  public redniBroj : number = -1;








  public konacnoVreme : string;
  public konacanSamoDatum : string;
  private imeRestorana : string;

  private uneti : number[] = [];
  private danasnji : number[] = [];
  private dobar: boolean = false;
  private dobarVreme: boolean = false;
  private dobarSat: boolean = true;

  public asd : number = 0;



  constructor(private userService: UserService, private orderService: OrderService, private foodService: FoodService, private drinkService: DrinkService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler)
  {
    for (var i = 0 ; i < 9 ; i++)
    {
      this.bojeStolova.push('#00ff00');
    }
    this.napuniListu();

    this.myHour = 1;

  }

  //neki komentar
  ngOnInit(): void {
    this.foodService.getAllFood().subscribe(
      foods => this.foods = foods,
      error =>  this.errorMessage = <any>error);

    this.drinkService.getAllDrink().subscribe(
      drinks => this.drinks = drinks,
      error =>  this.errorMessage = <any>error);

    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error =>  this.errorMessage = <any>error);

    this.userService.getRestaurant(this.waiter.id).subscribe(
      user => this.user = user,
      error =>  this.errorMessage = <any>error
    );

    this.selectedFoods =  new Array<Food>();
    this.selectedDrinks = new Array<Drink>();
    this.brHrane = 0;
    this.brPica = 0;



    var elem2 = <HTMLCanvasElement>document.getElementById('myCanvas2');
    var context2 = elem2.getContext('2d');

    var elem = <HTMLCanvasElement>document.getElementById('myCanvas');


    context2.fillStyle="red"
    context2.fillRect(10, 10, 50, 50);
    context2.lineWidth=3;
    context2.fillStyle="black"
    context2.font="20px Arial";
    context2.strokeRect(10, 10, 51, 51);
    context2.fillText("Zauzet od drugog gosta",40 + 30 , 10 +35);


    context2.fillStyle="red"
    context2.fillRect(10, 100, 50, 50);
    context2.fillStyle="black"
    context2.font="20px Arial";
    context2.fillText("Zauzet",40 + 30 , 100 +35);


    context2.fillStyle="#00ff00"
    context2.fillRect(10, 190, 50, 50);
    context2.fillStyle="black"
    context2.font="20px Arial";
    context2.fillText("Slobodan",40 + 30 , 190 +35);




    var elemLeft = elem.offsetLeft;
    var elemTop = elem.offsetTop;

    elem.addEventListener('click', (event: Event) => {
      var x = (event as any).pageX - elemLeft;
      var y  = (event as any).pageY - elemTop;
      var z = x + " " + y;
      for (var i = 0; i < this.elements.length;i++)
      {

        var element = this.elements[i];
        if (!element.tudjiSto && y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {

          console.log("LISTENER "+ ( Math.random() * (10 - 1) + 1) + "ID JE  "+ element.id); // dva puta udje o.0
          // alert(element.left);
          if (element.colour == "#00ff00") {
            element.colour = "#FF0000";

          }
          else {
            element.colour = "#00ff00";

          }
          this.renderuj();
          break;

        }

      }

    });
    this.renderuj();

  }


  public onChange(n : number) : void
  {
    this.myHour = n;
     this.promena();
  }

  public onInputTime(v : number) : void {
    this.myTime = v;
    var x = this.myTime.toString();
    var y = x.split(":");
    var z = +y[0];

    if (22 -z < 5)
    {
      var znj = 22-z;
      var element = document.getElementById("asd");
      element.setAttribute("max", znj.toString());
    }
    else
    {
      var element = document.getElementById("asd");
      element.setAttribute("max", "5");
    }
    this.dobarVreme = true;
    this.promena();
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
      this.dobar = true;
      this.promena();
      document.getElementById("LOL").innerHTML ="";

    }

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

  addOrderItem(): void{
    var zavrsniStolovi = [];
    for (var i = 0 ; i < this.elements.length;i++)
    {
      if (this.elements[i].colour != '#00ff00' && this.elements[i].tudjiSto == 0)
      {
        zavrsniStolovi.push(this.elements[i].id);
      }
    }
    let order = new Order(null, zavrsniStolovi, this.user.restaurantName, this.konacnoVreme,false,false);
    this.orderService.addOrder(order).subscribe(data => this.order = data,
      error => console.log("Error: ", error),
      () => this.addOrderFood());

  }

  addOrderFood(): void
  {
    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      var order_food = new OrderFood(null, this.selectedFoods[i], this.order, false, false);
      this.orderService.addOrderFood(order_food).subscribe(data => this.order_food = data);
    }
    this.addOrderDrink();
  }

  addOrderDrink(): void
  {
    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      var order_drink = new OrderDrink(null, this.selectedDrinks[i], this.order, null);
      this.orderService.addOrderDrink(order_drink).subscribe(data => this.order_drink = data);
    }

    this.router.navigate(['../waiter/orders']);
  }

  loadSelect(): void{
    alert('Usao');
    (<any>$('.selectpicker')).selectpicker({
      style: 'btn-default',
      showIcon: true,
      size: 4
    });
  }

  addFood(id: string): void{
    //this.listOfFoods = document.getElementById("foods_id");
    //this.listOfFoods = this.listOfFoods + "<li id='" + this.brHrane + "' class=\"list-group-item\">"+ id + "<div class=\"pull-right action-buttons\">     <button type=\"button\" class=\"btn btn-success btn-xs\" aria-label=\"Left Align\" (click) = \"removeFood(" + this.brHrane + ")\" ><span class=\"glyphicon glyphicon-pencil\"></span></button> </div> </li>";
    this.selectedFoods.push(this.findFood(id));
    //this.brHrane++;
    //alert('Name of foood: ' + this.findFoodById(<any> id).name);
  }

  addDrink(id: string): void{
    this.selectedDrinks.push(this.findDrink(id));
    //this.brPica++;
  }

  removeFood(id: number): void
  {
    this.selectedFoods.splice(id, 1);
  }

  removeDrink(id: number): void
  {
    this.selectedDrinks.splice(id, 1);
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

  cloneFood(food: Food): Food
  {
    this.newFood = new Food(food.id, food.name, food.foodDescription, food.price);
    // this.newFood.name = food.name;
    // this.newFood.foodDescription = food.foodDescription;
    // this.newFood.price = food.price;
    // this.newFood.id = food.id;

    return this.newFood;
  }
  inc(): number
  {
    this.brHrane++;
    return this.brHrane;
  }

  public obrada(vreme: number) : string
  {
    var t = vreme.toString();
    var a = t.split(":");
    var z = +a[0];
    var x = +this.myHour;
    var v = (z + x);
    if (v < 10)
    {
      var znj = "0"+v.toString();
      return znj+":"+a[1];
    }
    var rez = v+":"+a[1];
    return rez;
  }

  public napuniListu() : void
  {this.elements = [];

    this.elements.push({
      colour: this.bojeStolova[0],
      width: this.size,
      height: this.size,
      top: this.razmak,
      left: this.razmak,
      id : 1,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[1],
      width: this.size,
      height: this.size,
      top: this.razmak,
      left: this.razmak*2 + this.size,
      id : 2,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[2],
      width: this.size,
      height: this.size,
      top: this.razmak,
      left: this.razmak*3 + this.size*2,
      id : 3,
      tudjiSto : 0
    });
    ///////////////////////////////////////////////////////
    this.elements.push({
      colour: this.bojeStolova[3],
      width: this.size,
      height: this.size,
      top: this.razmak*2 + this.size,
      left: this.razmak,
      id : 4,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[4],
      width: this.size,
      height: this.size,
      top: this.razmak*2 + this.size,
      left: this.razmak*2 + this.size,
      id : 5,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[5],
      width: this.size,
      height: this.size,
      top: this.razmak*2 + this.size,
      left: this.razmak*3 + this.size*2,
      id : 6,
      tudjiSto : 0
    });
    ///////////////////////////////////////////////////////
    this.elements.push({
      colour: this.bojeStolova[6],
      width: this.size,
      height: this.size,
      top: this.razmak*3 + this.size*2,
      left: this.razmak,
      id : 7,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[7],
      width: this.size,
      height: this.size,
      top: this.razmak*3 + this.size*2,
      left: this.razmak*2 + this.size,
      id : 8,
      tudjiSto : 0
    });
    this.elements.push({
      colour: this.bojeStolova[8],
      width: this.size,
      height: this.size,
      top: this.razmak*3 + this.size*2,
      left: this.razmak*3 + this.size*2,
      id : 9,
      tudjiSto : 0
    });


  }

  public renderuj () : void{
    var elem = <HTMLCanvasElement>document.getElementById('myCanvas');
    var context = elem.getContext('2d');
    context.clearRect(0, 0, elem.width, elem.height);
    this.elements.forEach(function(element) {


      if ( element.tudjiSto == 1 )
      {
        //element.tudjiSto = 1;
        context.fillStyle = "#FF0000";
        context.fillRect(element.left, element.top, element.width, element.height);
        context.fillStyle="white";
        context.font="30px Arial";
        context.fillText(element.id,element.left + 30 , element.top +50);
        context.lineWidth=3;
        context.strokeRect(element.left, element.top, element.width+1, element.height+1);

      }
      else {

        context.fillStyle = element.colour;
        context.fillRect(element.left, element.top, element.width, element.height);
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.fillText(element.id, element.left + 30, element.top + 50);
        context.lineWidth=0;
        //var asd = ( Math.random() * (10 - 1) + 1);
        // console.log("PRE ULASKA U RANDOM element id JE " + element.id);
      }
    });
  }



  private promena() : void {

    var dan = this.uneti[0];
    var mesec = this.uneti[1];
    var obradjenDan = "";
    var obradjenMesec = "";
    if (dan < 10)
    {
      obradjenDan = "0"+dan.toString();

    }
    else
    {
      obradjenDan = dan.toString();
    }
    if (mesec < 10)
    {
      obradjenMesec= "0"+mesec.toString();
    }
    else {
      obradjenMesec= mesec.toString();
    }



    this.konacanSamoDatum = obradjenDan+"." + obradjenMesec + "." + this.uneti[2] ;
    this.konacnoVreme = this.konacanSamoDatum + " " +  this.myTime + " " + this.obrada(this.myTime);
    // console.log("IZGENERISAO SAM datum " + this.konacanSamoDatum);

    if (this.dobar && this.dobarSat && this.dobarVreme) {

      // daj sve ordere koji imaju veze sa onim sto je korisnik odabrao
      this.orderService.getOrders().subscribe(
        orders => this.orders = orders,
        error => this.errorMessage = <any>error,
        () => this.cekiraj());
    }
  }

  private cekiraj() : void {
    // console.log("PROVERAVAM XD");

    var nemaPromena = true;
    if (this.orders.length == 0) //nema nijedan order sve ostaje isto
    {
      return;
    }
    var zauzetiStoloviOdDrugih = [];
    for (var i = 0 ; i < this.orders.length;i++)
    {
      var dobijeni = this.dajPocetakIKrajiDatum(this.orders[i].vreme);
      var trenutni = this.dajPocetakIKrajiDatum(this.konacnoVreme);
      var prvaPocela = dobijeni[0];
      var prvaZavrsila = dobijeni[1];
      var drugaPocela = trenutni[0];
      var drugaZavrsila = trenutni[1];

      var datumPrvog = dobijeni[2];
      var datumDrugog = trenutni[2];

      if ( this.dajKoeficijentDatuma(datumDrugog) == this.dajKoeficijentDatuma(datumPrvog) &&   this.orders[i].nazivRestorana == this.user.restaurantName && this.dajKoeficijent(prvaPocela) < this.dajKoeficijent(drugaZavrsila) && this.dajKoeficijent(drugaPocela) < this.dajKoeficijent(prvaZavrsila))
      {

        for( var j = 0; j <  this.orders[i].brojStola.length ; j++)
        {
          nemaPromena = false;
          this.elements[this.orders[i].brojStola[j]-1].tudjiSto = 1;
          zauzetiStoloviOdDrugih.push(this.orders[i].brojStola[j]);
        }



      }
    }
    if (nemaPromena )
    {
      this.napuniListu(); // ovde je reset

    }
    this.renderuj();
    console.log("ovoliko stolova je zauzeto " + zauzetiStoloviOdDrugih.length);

    return;

  }

  private dajPocetakIKrajiDatum(s : string): string[]
  {
    var p = s.split(" ");
    var a =[]
    a[0] = p[1]; // poceo
    a[1] = p[2]; // zavrsio
    a[2] = p[0]; // datum
    return a;
  }

  private dajKoeficijent(s : string) : number
  {
    var x = s.split(":");


    var p = parseInt(s[0], 10);
    var d = parseInt(s[1], 10);
    return p*60 + d;
  }

  private dajKoeficijentDatuma(s :string) : number
  {
    var s1 = s.split(".");
    var dan = parseInt(s1[0], 10);
    var mesec = parseInt(s1[1], 10);
    var godina = parseInt(s1[2], 10);
    return dan * 100 + mesec * 10000 + godina * 1000000;
  }

}
