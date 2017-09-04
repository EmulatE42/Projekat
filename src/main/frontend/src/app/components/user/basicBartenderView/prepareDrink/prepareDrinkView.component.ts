import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter, OrderFood, OrderDrink, Cook, User, NewUser, Bartender} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import {FoodService} from "../../../../services/food/FoodService";
import {DrinkService} from "../../../../services/drink/DrinkService";



@Component({
  templateUrl: './prepareDrinkView.component.html',
  styleUrls: ['./prepareDrinkView.component.css'],
  providers: [UserService, OrderService]
})

export class PrepareDrink implements OnInit{

  bartender: Bartender = JSON.parse(sessionStorage.getItem("loginUser"));

  order_drinks: OrderDrink[] = null;

  orders: Order[] = null;
  orderDrinks: OrderDrink[] = null;
  user: NewUser;

  foods: Food[] = null;
  drinks: Drink[] = null;
  selectedFoods: Food[];
  selectedDrinks: Drink[];
  newFood: Food;
  errorMessage: string;
  order: Order;
  order_food: OrderFood;
  order_drink: OrderDrink;

  add_order: boolean = false;
  redBroj: number;

  constructor(private userService: UserService, private orderService: OrderService, private foodService: FoodService, private drinkService: DrinkService, private router: Router)
  {}

  //neki komentar
  ngOnInit(): void {

    this.orderService.getOrderDrinks().subscribe(
      drinks => this.orderDrinks = drinks,
      error =>  this.errorMessage = <any>error,
      () => this.init1());


  }

  init1(): void
  {
    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error =>  this.errorMessage = <any>error,
      () => this.init2());
  }

  init2(): void
  {
    this.userService.getRestaurant(this.bartender.id).subscribe(
      user => this.user = user,
      error =>  this.errorMessage = <any>error,
      () => this.initialization()
    );
  }

  initialization(): void
  {
    this.order_drinks = new Array<OrderDrink>();
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



        if(time.localeCompare(this.user.startTime) > 0 && time.localeCompare(this.user.endTime) < 0)
        {
          for(var j = 0; j < this.orderDrinks.length; j++)
          {
            if(this.orderDrinks[j].order.id == this.orders[i].id)
            {
              this.order_drinks.push(this.orderDrinks[j]);
              //alert("ID: " + this.orderFoods[j].order_food_id);
            }
          }
        }
      }
    }
  }


  loadSelect(): void{
    alert('Usao');
    (<any>$('.selectpicker')).selectpicker({
      style: 'btn-default',
      showIcon: true,
      size: 4
    });
  }


  findDrink(data: string): Food{
    var f = null;
    this.foods.forEach(function(food) {
      if(food.name.localeCompare(data) === 0) {
        f = food;
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

  findOrderDrink(id:number): OrderDrink
  {
    for(var j = 0; j < this.order_drinks.length; j++)
    {
      if(this.order_drinks[j].order_drink_id == id)
        return this.order_drinks[j];
    }
    return null;
  }

  ready(id: string): void
  {
    var orderDrink = this.findOrderDrink(<any> id);
    alert("ID: " + id);
    this.orderService.updateOrderDrinkReady(orderDrink).subscribe(
      order_drink => this.order_drink = order_drink,
      error =>  this.errorMessage = <any>error);
  }

  inc(): number
  {
    return ++this.redBroj;
  }
}
