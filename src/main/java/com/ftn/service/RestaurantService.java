package com.ftn.service;

import com.ftn.domain.Drink;
import com.ftn.domain.Food;
import com.ftn.domain.Restaurant;

import java.util.List;

/**
 * Created by Momir on 5/14/2017.
 */
public interface RestaurantService {

    List<Restaurant> getRestaurants();
    Restaurant save(Restaurant r);


}
