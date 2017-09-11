import {
  AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ComponentRef, Input,
  ViewContainerRef, Compiler, ComponentFactoryResolver, Type
} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase'
import {UserService} from "../../../../services/user/UserService";
import {
  Drink, Food, Order, Waiter, OrderFood, OrderDrink, NewUser,
  ShopingCartFoodItem, ShopingCartDrinkItem
} from "../../../../models";
import {OrderService} from "../../../../services/order/OrderService";
import {forEach} from "@angular/router/src/utils/collection";
import {FoodService} from "../../../../services/food/FoodService";
import {DrinkService} from "../../../../services/drink/DrinkService";



@Component({
  templateUrl: './createBill.component.html',
  styleUrls: ['./createBill.component.css'],
  providers: [UserService, OrderService]
})

export class CreateBill implements OnInit{

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
  elements: ShopingCartFoodItem[];
  elements2: ShopingCartDrinkItem[];
  nazivRestorana: string;
  cena: number = 0;

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

    this.selectedFoods = new Array<Food>();
    this.selectedDrinks = new Array<Drink>();

    this.orderService.getOrders().subscribe(
      orders => this.orders = orders,
      error =>  this.errorMessage = <any>error,
      () => this.setOrder(this.id));

    this.orderService.getOrderFoods().subscribe(
      drinks => this.orderFoods = drinks,
      error =>  this.errorMessage = <any>error,
      () => this.initOrderFoods(this.id));


  }

  setOrder(id: number): void
  {
    for(var i = 0; i < this.orders.length; i++)
    {
      if(this.orders[i].id == id) {
        this.order = this.orders[i];
        this.nazivRestorana = this.order.nazivRestorana;
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
    this.init();
  }

  init(): void{
    this.orderService.getOrderDrinks().subscribe(
      drinks => this.orderDrinks = drinks,
      error =>  this.errorMessage = <any>error,
      () => this.initOrderDrinks(this.id));
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
    this.shoppingCartItems();
  }

  shoppingCartItems(): void{

    this.elements = new Array<ShopingCartFoodItem>();
    this.elements2 = new Array<ShopingCartDrinkItem>();

    for(var i = 0; i < this.selectedFoods.length; i++)
    {
      var index = this.findFoodItem(this.selectedFoods[i].name);
      if(index != -1)
      {
        this.elements[index].size++;
        this.cena += this.selectedFoods[i].price;
      }
      else
      {
        this.elements.push(new ShopingCartFoodItem(this.selectedFoods[i], 1));
        this.cena += this.selectedFoods[i].price;
      }
    }

    for(var i = 0; i < this.selectedDrinks.length; i++)
    {
      var index = this.findDrinkItem(this.selectedDrinks[i].name);
      if(index != -1)
      {
        this.elements2[index].size++;
        this.cena += this.selectedDrinks[i].price;
      }
      else
      {
        this.elements2.push(new ShopingCartDrinkItem(this.selectedDrinks[i], 1));
        this.cena += this.selectedDrinks[i].price;
      }
    }

  }

  findFoodItem(name: string): number {
    for(var i = 0; i < this.elements.length; i++)
    {
      if(this.elements[i].food.name == name)
        return i;
    }
    return -1;
  }

  findDrinkItem(name: string): number {
    for(var i = 0; i < this.elements2.length; i++)
    {
      if(this.elements2[i].drink.name == name)
        return i;
    }
    return -1;
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

  curretDate(): string
  {
    var date = (new Date()).toLocaleString();
    return date.toString();
  }

  deleteOrder(): void
  {
    this.orderService.deleteOrder(this.order).subscribe(
      order => this.order = order,
      error =>  this.errorMessage = <any>error,
      () => this.finishOrder());
  }

  finishOrder(): void
  {
    this.router.navigate(['../waiter/orders']);
  }

}
