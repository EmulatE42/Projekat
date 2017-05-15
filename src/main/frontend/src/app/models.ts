export class User
{
  constructor( public id: number,
               public first_name : string,
               public last_name : string,
               public email : string,
               public password : string

  ) {}
}


export class Guest{

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  online: boolean;
}

export class Restaurant{

  id: number;
  name: string;
  distance: number;
  rating: number;
  friendRating: number;
  reservation: boolean;
}
