import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";

@Component({
  templateUrl: './basicGuestView.component.html',
  providers: [RestaurantService]
})

export class BasicGuestView implements OnInit{

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

}
