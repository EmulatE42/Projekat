import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {Guest, Restaurant} from "../../../models";
import {RestaurantService} from "../../../services/restaurant/RestaurantService";

@Component({
  templateUrl: './basicBartenderView.component.html',
  providers: []
})

export class BasicBartenderView implements OnInit{




  //constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {

  }


}
