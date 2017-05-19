export enum  Role {
  GOST, KUVAR, KONOBAR, SANKER

};



export class User
{
  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string,
               public role: Role

  ) {}
}


export class Guest extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public online: boolean)
  {
    super(id, first_name, last_name, email, password, role);
  }
}

export class Waiter extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role);
  }
}

export class Cook extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role);
  }
}

export class Bartender extends User{
  constructor(public id: number,
              public first_name : string,
              public last_name : string,
              public email : string,
              public password : string,
              public role: Role,
              public firstTimeLogin: boolean)
  {
    super(id, first_name, last_name, email, password, role);
  }
}

export class Restaurant{

  id: number;
  name: string;
  distance: number;
  rating: number;
  friendRating: number;
  reservation: boolean;
}
