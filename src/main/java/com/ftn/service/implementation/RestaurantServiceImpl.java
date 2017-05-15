package com.ftn.service.implementation;

import com.ftn.domain.Restaurant;
import com.ftn.repository.RestaurantRepository;
import com.ftn.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Momir on 5/14/2017.
 */

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public List<Restaurant> getRestaurants() {

        //inicijalizacija, posto jos uvek nemamo fromu za unos restorana
        Restaurant r1 = new Restaurant("Krkanluk", 750, 4.5, 4.2,false);
        Restaurant r2 = new Restaurant("Ispod saca", 250, 4.8, 5,false);

        List<Restaurant> restaurants = new ArrayList<>();
        restaurants.add(r1);
        restaurants.add(r2);


        //List<Restaurant> restaurants = restaurantRepository.getAll();
        return restaurants;
    }
}
