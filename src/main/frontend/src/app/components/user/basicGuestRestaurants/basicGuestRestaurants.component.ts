import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";

@Component({
  templateUrl: './basicGuestRestaurants.component.html',
  styleUrls: ['./basicGuestRestaurants.component.css'],
  providers: [RestaurantService]
})

export class BasicGuestRestaurants implements OnInit{

  private errorMessage: string = "Doslo je do greske!";
  private message: string;
  private restaurants: Restaurant[];


  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getAll()
      .subscribe(restaurants => this.restaurants = restaurants,
        error => this.errorMessage = <any>error);

  }


  onRatingClicked(message: string): void {
    this.message = 'Product List: ' + message;

  }
  sortiraj() : void
  {
  for (var i = 0; i < this.restaurants.length;i++)
  {
    for (var j = i ; j < this.restaurants.length;j++)
    {
      if (this.restaurants[i].name > this.restaurants[j].name)
      {
        var te = this.restaurants[i];
        this.restaurants[i] = this.restaurants[j];
        this.restaurants[j] = te;
      }
    }
  }

  }

  sortiraj2() : void
  {
    for (var i = 0; i < this.restaurants.length;i++)
    {
      for (var j = i ; j < this.restaurants.length;j++)
      {
        if (this.restaurants[i].distance > this.restaurants[j].distance)
        {
          var te = this.restaurants[i];
          this.restaurants[i] = this.restaurants[j];
          this.restaurants[j] = te;
        }
      }
    }

  }

  sortiraj3() : void
  {
    for (var i = 0; i < this.restaurants.length;i++)
    {
      for (var j = i ; j < this.restaurants.length;j++)
      {
        if (this.restaurants[i].description > this.restaurants[j].description)
        {
          var te = this.restaurants[i];
          this.restaurants[i] = this.restaurants[j];
          this.restaurants[j] = te;
        }
      }
    }

  }

}
