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

export class SuperUser
{
  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string,
               public role: Role,
               public avatar: string,
               public online: boolean,
               public birth: string,
               public dressSize: number,
               public shoeSize: number,
               public firstTimeLogin: boolean) {}
}


export class Guest extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public avatar: string,
              public online: boolean)
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

  id: number;
  name: string;
  foodDescription: string;
  price: number;
}

export class Drink{

  id: number;
  name: string;
  drinkDescription: string;
  price: number;
}

export class Restaurant{

  id: number;
  name: string;
  distance: number;
  rating: number;
  friendRating: number;
  reservation: boolean;
}
