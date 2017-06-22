package com.ftn.contoller;

import com.ftn.domain.DTO.UserDTO;
import com.ftn.domain.Drink;
import com.ftn.domain.Food;
import com.ftn.domain.Order;
import com.ftn.domain.User;
import com.ftn.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @CrossOrigin
    @RequestMapping(value = "/foods", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Set<Food>> getFoods() {

        Set<Food> foods = this.orderService.getFoods();

        return new ResponseEntity(foods != null ? foods : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/drinks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Set<Drink>> getDrinks() {

        Set<Drink> drinks = this.orderService.getDrinks();

        return new ResponseEntity(drinks != null ? drinks : "{}", HttpStatus.OK);
    }
}
