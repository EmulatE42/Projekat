import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter, OrderFood, OrderDrink, NewUser} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import { StarRatingModule } from 'angular-star-rating';


@Component({
  templateUrl: './ordersView.component.html',
  styleUrls: ['./ordersView.component.css'],
  providers: [UserService, OrderService]
})

export class OrdersWaiterView implements OnInit{

  waiter: Waiter = JSON.parse(sessionStorage.getItem("loginUser"));

  foods: Food[] = null;
  drinks: Drink[] = null;
  selectedFoods: Food[];
  selectedDrinks: Drink[];
  orders: Order[] = null;
  newFood: Food;
  errorMessage: string;
  orderFoods: OrderFood[] = null;
  orderDrinks: OrderDrink[] = null;
  order: Order;
  realOrders: Order[] = null;
  user: NewUser;

  add_order: boolean = false;
  redBroj: number;

  constructor(private userService: UserService, private orderService: OrderService, private router: Router)
  {}

  //neki komentar
  ngOnInit(): void {
    this.orderService.getFoods().subscribe(
        foods => this.foods = foods,
        error =>  this.errorMessage = <any>error);

    this.orderService.getDrinks().subscribe(
      drinks => this.drinks = drinks,
      error =>  this.errorMessage = <any>error);

    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error =>  this.errorMessage = <any>error,
      () => this.init1());

    this.selectedFoods = new Array<Food>();
    this.selectedDrinks = new Array<Drink>();
    this.redBroj = 0;
  }

  init1(): void
  {
    this.userService.getRestaurant(this.waiter.id).subscribe(
      user => this.user = user,
      error =>  this.errorMessage = <any>error,
      () => this.init2()
    );
  }

  init2(): void
  {
    this.orderService.getOrderFoods().subscribe(
      order_foods => this.orderFoods = order_foods,
      error =>  this.errorMessage = <any>error,
      () => this.init3());
  }

  init3(): void
  {
    this.orderService.getOrderDrinks().subscribe(
      order_foods => this.orderDrinks = order_foods,
      error =>  this.errorMessage = <any>error,
      () => this.initOrder());
  }

  initOrder(): void
  {
    this.realOrders = new Array<Order>();
    //alert("Orders: " + this.orders.length);
    //alert("OrderFoods: " + this.orderFoods.length);
    for(var i = 0; i < this.orders.length; i++)
    {
      if(this.orders[i].nazivRestorana.localeCompare(this.user.restaurantName) == 0)
      {
        var str = this.orders[i].vreme.split(" ");
        var time = "10:00";
        if(str != null)
          time = str[1];



        if(time.localeCompare(this.user.startTime) >= 0 && time.localeCompare(this.user.endTime) <= 0)
        {

          this.realOrders.push(this.orders[i]);

        }
      }
    }
    this.init4();
  }

  init4(): void
  {

    for(var i = 0; i < this.realOrders.length; i++)
    {
      var exist = 1;
          for(var j = 0; j < this.orderFoods.length; j++)
          {
            //alert("Duzina niza: " + this.orderFoods.length);
            if(this.orderFoods[j].order.id == this.realOrders[i].id)
            {
              if(this.orderFoods[j].ready == false)
              {
                exist = 0;
                break;
              }
            }
          }

          if(exist != 0) {
            for (var j = 0; j < this.orderDrinks.length; j++) {
              //alert("Duzina niza: " + this.orderFoods.length);
              if (this.orderDrinks[j].order.id == this.realOrders[i].id) {
                if (this.orderDrinks[j].ready == false) {
                  exist = 0;
                  break;
                }
              }
            }
          }


          if(exist == 1) {
            //alert("Update orderID: " + this.realOrders[i].id);
            this.realOrders[i].ready = true;
            this.orderService.updateOrderReady(this.realOrders[i]).subscribe(
              order => this.order = order,
              error => this.errorMessage = <any>error);
          }
    }
    this.init5();
  }

  init5(): void
  {
    for(var i = 0; i < this.realOrders.length; i++)
    {
      var exist = 1;
      for(var j = 0; j < this.orderFoods.length; j++)
      {
        //alert("Duzina niza: " + this.orderFoods.length);
        if(this.orderFoods[j].order.id == this.realOrders[i].id)
        {
          if(this.orderFoods[j].accept == false)
          {
            exist = 0;
            break;
          }
        }
      }

      if(exist == 1) {
        //alert("Update orderID: " + this.realOrders[i].id);
        this.realOrders[i].accept = true;
        this.orderService.updateOrderAccept(this.realOrders[i]).subscribe(
          order => this.order = order,
          error => this.errorMessage = <any>error);
      }
    }
  }



  addOrder(): void{
    this.router.navigate(['../waiter/add_order']);
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
    var listOfFoods = document.getElementById("foods_id");
    listOfFoods.innerHTML = listOfFoods.innerHTML + "<li class=\"list-group-item\">"+ id + "<div class=\"pull-right action-buttons\">     <button type=\"button\" class=\"btn btn-success btn-xs\" aria-label=\"Left Align\" (click) = \"addFood(food.name)\" ><span class=\"glyphicon glyphicon-pencil\"></span></button> </div> </li>";
  }

  addDrink(id: string): void{
    var listOfDrinks = document.getElementById("drinks_id");
    listOfDrinks.innerHTML = listOfDrinks.innerHTML + "<li class=\"list-group-item\">"+ id + "<div class=\"pull-right action-buttons\">     <button type=\"button\" class=\"btn btn-success btn-xs\" aria-label=\"Left Align\" (click) = \"addFood(food.name)\" ><span class=\"glyphicon glyphicon-pencil\"></span></button> </div> </li>";
  }

  findFood(data: string): Food{
    this.foods.forEach(function(food) {
      if(food.name.localeCompare(data) == 0) {
        return food;
      }
    });
    return null;
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
    return ++this.redBroj;
  }
}
