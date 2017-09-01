import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";



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
      error =>  this.errorMessage = <any>error);

    this.selectedFoods = new Array<Food>();
    this.selectedDrinks = new Array<Drink>();
    this.redBroj = 0;
  }


  addOrder(): void{
    this.add_order = true;
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
