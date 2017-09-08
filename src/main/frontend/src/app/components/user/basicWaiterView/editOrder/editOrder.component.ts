import {
  AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ComponentRef, Input,
  ViewContainerRef, Compiler, ComponentFactoryResolver, Type
} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {Drink, Food, Order, Waiter, OrderFood, OrderDrink, NewUser} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import {FoodService} from "../../../../services/food/FoodService";
import {DrinkService} from "../../../../services/drink/DrinkService";



@Component({
  templateUrl: './editOrder.component.html',
  styleUrls: ['./editOrder.component.css'],
  providers: [UserService, OrderService]
})

export class EditOrderView implements OnInit{

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
  orderFoods: OrderFood[] = null;
  orderDrinks: OrderDrink[] = null;

  add_order: boolean = false;
  brHrane: number;
  brPica: number;
  index: number;
  index1: number;
  canAdd1: boolean;
  canAdd2: boolean;
  id: number;

  constructor(private userService: UserService, private orderService: OrderService, private _route: ActivatedRoute, private foodService: FoodService, private drinkService: DrinkService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler)
  {}

  //neki komentar
  ngOnInit(): void {

    this.id = +this._route.snapshot.paramMap.get('id');
    this.brHrane = 0;
    this.brPica = 0;
    this.index = 0;
    this.index1 = 0;
    this.canAdd1 = true;
    this.canAdd2 = true;

    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error =>  this.errorMessage = <any>error,
      () => this.setOrder(this.id));

    this.foodService.getAllFood().subscribe(
      foods => this.foods = foods,
      error =>  this.errorMessage = <any>error);

    this.drinkService.getAllDrink().subscribe(
      drinks => this.drinks = drinks,
      error =>  this.errorMessage = <any>error);

    this.orderService.getOrderFoods().subscribe(
      drinks => this.orderFoods = drinks,
      error =>  this.errorMessage = <any>error,
      () => this.initOrderFoods(this.id));

    this.orderService.getOrderDrinks().subscribe(
      drinks => this.orderDrinks = drinks,
      error =>  this.errorMessage = <any>error,
      () => this.initOrderDrinks(this.id));



    this.selectedFoods = new Array<Food>();
    this.selectedDrinks = new Array<Drink>();
    this.brHrane = 0;
    this.brPica = 0;
  }

  setOrder(id: number): void
  {
    for(var i = 0; i < this.orders.length; i++)
    {
      if(this.orders[i].id == id) {
        this.order = this.orders[i];
        break;
      }
    }
  }

  initOrderFoods(id: number): void
  {
    for(var i = 0; i < this.orderFoods.length; i++)
    {
      if(this.orderFoods[i].order.id == id)
      {
        this.brHrane++;
        this.selectedFoods.push(this.orderFoods[i].food);
      }

    }
  }

  initOrderDrinks(id: number): void
  {
    for(var i = 0; i < this.orderDrinks.length; i++)
    {
      if(this.orderDrinks[i].order.id == id)
      {
        this.brPica++;
        this.selectedDrinks.push(this.orderDrinks[i].drink);
      }

    }
  }

  editOrder(): void
  {
    if(!this.order.accept)
    {
      this.deleteOrderFoods();
      this.deleteOrderDrinks();
    }
    else {
      this.addOrderFood();
      this.addOrderDrink();
    }

  }

  deleteOrderFoods(): void
  {
    for(var i = this.index; i < this.orderFoods.length; i++)
    {
      this.index++;
      if(this.orderFoods[i].order.id == this.id)
      {
        this.deleteOrderFoodItem(this.orderFoods[i]);
      }
    }
    if(this.index == this.orderFoods.length && this.canAdd1 == true) {
      this.canAdd1 = false;
      this.addOrderFood();
    }
  }

  deleteOrderFoodItem(of: OrderFood): void
  {

    this.orderService.deleteOrderFood(of).subscribe(
      order_food => this.order_food = order_food,
      error =>  this.errorMessage = <any>error,
      () => this.deleteOrderFoods());
  }

  deleteOrderDrinks(): void
  {
    for(var i = this.index1; i < this.orderDrinks.length; i++)
    {
      this.index1++;
      if(this.orderDrinks[i].order.id == this.id)
      {
        this.deleteOrderDrinkItem(this.orderDrinks[i]);
      }
    }
    if(this.index1 == this.orderDrinks.length && this.canAdd2 == true) {
      this.canAdd2 = false;
      this.addOrderDrink();
    }
  }

  deleteOrderDrinkItem(od: OrderDrink): void
  {

    this.orderService.deleteOrderDrink(od).subscribe(
      order_drink => this.order_drink = order_drink,
      error =>  this.errorMessage = <any>error,
      () => this.deleteOrderDrinks());
  }

  addOrderFood(): void
  {
    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      if(this.brHrane <= i || this.order.accept == false) {
        var order_food = new OrderFood(null, this.selectedFoods[i], this.order, false, false);
        this.orderService.addOrderFood(order_food).subscribe(data => this.order_food = data);
      }
    }
  }

  addOrderDrink(): void
  {
    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      if(this.brPica <= i || this.order.accept == false) {
        var order_drink = new OrderDrink(null, this.selectedDrinks[i], this.order, null);
        this.orderService.addOrderDrink(order_drink).subscribe(data => this.order_drink = data);
      }
    }

    this.router.navigate(['../waiter/orders']);
  }

  findOrderFood(id: number): boolean
  {
    for(var i = 0; i < this.orderFoods.length; i++)
    {
      if(this.orderFoods[i].order_food_id == id)
        return false;
    }
    return true;
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
}
