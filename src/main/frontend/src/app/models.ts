import construct = Reflect.construct;
export enum  Role {
  GOST, KUVAR, KONOBAR, SANKER, PONUDJAC

};



export abstract class User
{
  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string,
               public role: Role,
               public avatar: string

  ) {}
}

export class NewUser
{
  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string,
               public role: Role,
               public avatar: string,
               public startTime: string,
               public endTime: string,
               public restaurantName: string

  ) {}
}

export class Friendship {
  constructor( public id: number,
               public koSalje: string,
               public komeSeSalje: string) {}
}

export class FriendRequest {
  constructor( public id: number,
               public uputio: string,
               public dobio: string) {}
}

export class Visit {

  constructor( public id: number,
               public email: string,
               public nazivRestorana: string,
                public datum: string) {}

}


export class SuperUser
{


  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string,
               public role: Role,
               public avatar: string,
               public birth: string,
               public dressSize: number,
               public shoeSize: number,
               public firstTimeLogin: boolean,
               public enabled: boolean,
               public adresa: string) {}
}


export class Guest extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public enabled: boolean,
              public adresa: string)
  {
    super(id, first_name, last_name, email, password, role, avatar);
  }
}

export class Waiter extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public birth: string,
              public dressSize: number,
              public shoeSize: number,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role, avatar);
  }
}

export class Cook extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public birth: string,
              public dressSize: number,
              public shoeSize: number,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role, avatar);
  }
}

export class Bartender extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public birth: string,
              public dressSize: number,
              public shoeSize: number,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role, avatar);
  }
}

export class Supplier extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public birth: string,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role, avatar);
  }
}





export class Food{

  //id: number;
 // name: string;
  //foodDescription: string;
 // price: number;


  constructor(public id: number,
              public  name: string,
              public foodDescription: string,
              public price: number) {}

}

export class Drink{


  constructor(public id: number,
              public  name: string,
              public drinkDescription: string,
              public price: number) {}

}

export class OrderDrinkItem {
   id: number;  drinks: Drink[] = [];  nazivRestorana: string;
  constructor(public i: number, public d: Drink[], public nr: string) {
    this.id = i;
    console.log("VELICINA LISTE KOJE SETUEJEM JE " + d.length);
    this.drinks = d;
    console.log("VELICINA MOJE LISTE NAKON SETOVANJA JE " + this.drinks.length);
    this.nazivRestorana = nr;
  }
}

export class Restaurant{

  id: number;
  name: string;
  distance: number;
  rating: number;
  friendRating: number;
  reservation: boolean;
  description : string;
}

export class SchedulerWork {
  id: number;
  userId: number;
  start: string;
  end: string;
  tables: number[];
}

export class EventScheduler {
  id: number;
  title: string;
  start: string;
  end: string;
  day: number;
}

export class Order
{
  constructor(public id: number,
              public  brojStola: number[],
              public nazivRestorana: string,
              public vreme: string,
              public ready: boolean,
              public accept: boolean) {}
}

export class OrderFood
{
  constructor(public order_food_id: number,
              public  food: Food,
              public order: Order,
              public ready: boolean,
              public accept: boolean) {}
}

export class OrderDrink
{
  constructor(public order_drink_id: number,
              public  drink: Drink,
              public order: Order,
              public ready: boolean) {}
}
