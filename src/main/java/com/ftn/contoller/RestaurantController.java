package com.ftn.contoller;

import com.ftn.domain.Drink;
import com.ftn.domain.Guest;
import com.ftn.domain.Restaurant;
import com.ftn.service.DrinkService;
import com.ftn.service.FoodService;
import com.ftn.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Momir on 5/14/2017.
 */
@RestController
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;



    @CrossOrigin
    @RequestMapping(value = "/restaurants", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Restaurant> dajRestorane() {
        System.out.println("DAJEM REST");
        List<Restaurant> restaurants = restaurantService.getRestaurants();
        return new ResponseEntity(restaurants != null ? restaurants : "{}", HttpStatus.OK);
    }
}
