import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FoodService} from "../../../../services/food/FoodService";
import {Drink, Food, Order, OrderDrink, OrderDrinkItem, OrderFood, Visit, Guest, Invite} from "../../../../models";
import {DrinkService} from "../../../../services/drink/DrinkService";
import {VisitService} from "../../../../services/visit/VisitService";
import {OrderService} from "../../../../services/order/OrderService";
import {FriendService} from "app/services/friend/FriendService";
import {InviteService} from "../../../../services/invite/InviteService";

@Component({
  selector: 'app-reserve-rest',
  templateUrl: './reserve-rest.component.html',
  styleUrls: ['./reserve-rest.component.css']
})

export class ReserveRestComponent implements OnInit {


  public timer: any;
  public myDate: Date;
  public myTime: number = -1;
  public myHour: number;
  public konacnoVreme : string;
  public konacanSamoDatum : string;
  private imeRestorana : string;
  private foods : Food[];
  private drinks : Drink[];

  private selectedFoods  = new Array<Food>();
  private selectedDrinks= new Array<Drink>();

  private poslednjiInvite: Invite;
  private prijatelji : Guest[] = [];
  private order: Order;
  private order_food: OrderFood;
  private order_drink: OrderDrink;
  errorMessage: string;
  private orders: Order[] = [];
  private poseta: Visit;
  private pozivi: Invite[] = [];
  private uneti : number[] = [];
  private danasnji : number[] = [];
  private dobar: boolean = false;
  private dobarVreme: boolean = false;
  private dobarSat: boolean = true;

  public size : number = 75;
  public razmak : number =50;
  public elements : any[] = [];
  public redniBroj : number = -1;

  public bojeStolova : string[] = [];
  public asd : number = 0;
  constructor(private inviteService : InviteService, private friendService:FriendService, private r: Router,private vs : VisitService, private drinkService: DrinkService, private  foodService : FoodService, private router: ActivatedRoute,private orderService: OrderService) {
    this.foodService.getAllFood()
    .subscribe(h => this.foods = h );

    this.drinkService.getAllDrink()
      .subscribe(h => this.drinks = h );
    this.friendService.getAllFR()
      .subscribe(h =>this.prijatelji = h,error => console.log("Error: ", error),
        () => this.izmeniRazmak());

    for (var i = 0 ; i < 9 ; i++)
    {
      this.bojeStolova.push('#00ff00');
    }
    this.napuniListu();

   this.myHour = 1;





  }

  izmeniRazmak (): void{
    var x = "";
    if (this.prijatelji.length == 1) {
      document.getElementById('razmak').innerHTML = "<br/><br/><br/><br/><br/>";
      return;
    }

    for (var i = 0 ; i < this.prijatelji.length; i++)
    {

      x+="<br/><br/><br/><br/>";
    }
    document.getElementById('razmak').innerHTML = x ;
  }
  pozvan (gost : Guest, mesto : number) : void{
    if (this.dobar && !(this.myTime == -1))
    {
      var email = JSON.parse(sessionStorage.getItem("loginUser")).email;
      var x = new Invite(null,email,gost.email,this.imeRestorana,null,null);
      this.pozivi.push(x);
      this.prijatelji.splice(mesto,1);
    }

  }
  obrisano ( id : number) : void{
  this.selectedDrinks.splice(id,1);

}

  obrisano2 ( n : number) : void{
    this.selectedFoods.splice(n,1);

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
   // this.promena();
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
    //this.promena();
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
     // this.promena();
      document.getElementById("LOL").innerHTML ="";

    }

  }
 ngOnDestroy()
 {
   clearInterval(this.timer);
   console.log("UNISTIO XD");
 }

  ngOnInit() {



    this.timer = setInterval(() => {


      this.promena();


      /*var inputElement = <HTMLInputElement>document.getElementById('asd');
      console.log("Vrednost je " + inputElement.value);
      inputElement.value = "4";
      console.log("Posle setovanja vrednost je " + inputElement.value);*/


    }, 1000);

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

    console.log("TOP MANJI JE " + elemTop );

    this.router
      .queryParams
      .subscribe(params => {
        this.imeRestorana = params['ime_Restorana'];
      });

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
    console.log("SELEKTOVAO SI INIIIT " + this.imeRestorana);



    this.renderuj();

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
    var zavrsniStolovi = [];
    for (var i = 0 ; i < this.elements.length;i++)
    {
      if (this.elements[i].colour != '#00ff00' && this.elements[i].tudjiSto == 0)
      {
        zavrsniStolovi.push(this.elements[i].id);
      }
    }
    let order = new Order(null, zavrsniStolovi, this.imeRestorana, this.konacnoVreme,false,false);
    this.orderService.addOrder(order).subscribe(data => this.order = data,
      error => console.log("Error: ", error),
      () => this.addOrderFood());

  }

  addOrderFood(): void
  {
    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      var order_food = new OrderFood(null, this.selectedFoods[i], this.order,false,false);
      this.orderService.addOrderFood(order_food).subscribe(data => this.order_food = data);
    }
    this.addOrderDrink();
  }

  addOrderDrink(): void
  {
    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      var order_drink = new OrderDrink(null, this.selectedDrinks[i], this.order,false);
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
    if (this.dobar && !(this.myTime == -1) && (this.selectedFoods.length != 0 || this.selectedDrinks.length !=0) && this.odabrao()) {
      document.getElementById("naKraju").innerHTML = "<div class=\" alert alert-success col-sm-1\"> Uspesan unos </div>";


        this.addOrderItem();
      this.vs.dodajPosetu(JSON.parse(sessionStorage.getItem("loginUser")).email, this.imeRestorana,  this.konacanSamoDatum).subscribe(h => this.poseta = h,error => console.log("Error: ", error),
        () => this.kraj());

    }

  }

  odabrao() :boolean
  {
    for (var i = 0 ; i < this.elements.length;i++)
    {
      if (this.elements[i].colour == "#FF0000" && this.elements[i].tudjiSto == 0)
      {
        return true;
      }
    }
    return false;
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

bla() : void
{

  for ( var i = 0 ; i < this.pozivi.length;i++)
  {
    this.pozivi[i].idPorudzbine = this.redniBroj;
    this.pozivi[i].datum = this.konacanSamoDatum;
    if (i == this.pozivi.length - 1) {
      this.inviteService.dodajPoziv(this.pozivi[i]).subscribe(
        orders => this.poslednjiInvite = orders,
        error => this.errorMessage = <any>error, () => this.konacanKrajxD());
    }
    else
    {
      this.inviteService.dodajPoziv(this.pozivi[i]).subscribe(
        orders => this.poslednjiInvite = orders);
    }
  }
  this.konacanKrajxD();


}
  konacanKrajxD() : void{
    this.sleep(2);

    this.r.navigate(['../']);
  }
public kraj () : void
{

  this.orderService.getMaxID().subscribe(
    orders => this.redniBroj = orders,
    error => this.errorMessage = <any>error,() => this.bla());


}
  public sleep(seconds) : void
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
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

      if ( this.dajKoeficijentDatuma(datumDrugog) == this.dajKoeficijentDatuma(datumPrvog) &&   this.orders[i].nazivRestorana == this.imeRestorana && this.dajKoeficijent(prvaPocela) < this.dajKoeficijent(drugaZavrsila) && this.dajKoeficijent(drugaPocela) < this.dajKoeficijent(prvaZavrsila))
      {

        for( var j = 0; j <  this.orders[i].brojStola.length ; j++)
        {
          nemaPromena = false;
          this.elements[this.orders[i].brojStola[j]-1].tudjiSto = 1;
          zauzetiStoloviOdDrugih.push(this.orders[i].brojStola[j]);
        }



      }
      }
      if (nemaPromena && ! this.nekiStoJeCrven())
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

  public nekiStoJeCrven() : boolean
  {
    for (var i = 0 ; i < this.elements.length;i++)
    {
      if (this.elements[i].colour == "#FF0000")
      {
        return true;
      }
    }
    return false;
  }

}





