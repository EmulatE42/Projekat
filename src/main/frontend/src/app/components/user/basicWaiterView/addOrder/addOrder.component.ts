import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter, OrderFood, OrderDrink} from "../../../../models";
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

  add_order: boolean = false;
  redBroj: number;

  constructor(private userService: UserService, private orderService: OrderService, private foodService: FoodService, private drinkService: DrinkService, private router: Router)
  {}

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

    this.selectedFoods = new Array<Food>();
    this.selectedDrinks = new Array<Drink>();
    this.redBroj = 0;
  }


  addOrderItem(): void{
    let order = new Order(null, null, "Restoran", null);
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
    var listOfFoods = document.getElementById("foods_id");
    listOfFoods.innerHTML = listOfFoods.innerHTML + "<li class=\"list-group-item\">"+ id + "<div class=\"pull-right action-buttons\">     <button type=\"button\" class=\"btn btn-success btn-xs\" aria-label=\"Left Align\" (click) = \"addFood(food.name)\" ><span class=\"glyphicon glyphicon-pencil\"></span></button> </div> </li>";
    this.selectedFoods.push(this.findFood(id));
    //alert('Name of foood: ' + this.findFoodById(<any> id).name);
  }

  addDrink(id: string): void{
    var listOfDrinks = document.getElementById("drinks_id");
    listOfDrinks.innerHTML = listOfDrinks.innerHTML + "<li class=\"list-group-item\">"+ id + "<div class=\"pull-right action-buttons\">     <button type=\"button\" class=\"btn btn-success btn-xs\" aria-label=\"Left Align\" (click) = \"addFood(food.name)\" ><span class=\"glyphicon glyphicon-pencil\"></span></button> </div> </li>";
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
