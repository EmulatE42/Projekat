import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";

@Component({
  templateUrl: './basicCookView.component.html',
  providers: []
})

export class BasicCookView implements OnInit{




  //constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {

  }


}
