package com.ftn.contoller;

import com.ftn.domain.Order;
import com.ftn.domain.Order_Food;
import com.ftn.service.OrderFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 03.09.2017.
 */
@RestController
public class OrderFoodController {

    @Autowired
    OrderFoodService orderFoodService;

    @CrossOrigin
    @RequestMapping(value = "/add_order_food",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order_Food> addOrderFood(@RequestBody Order_Food order_food) {

        this.orderFoodService.save(order_food);

        return new ResponseEntity(order_food != null ? order_food : "{}", HttpStatus.OK);
    }


    @CrossOrigin
    @RequestMapping(value = "/order_foods", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Order_Food>> getOrderFoods() {

        List<Order_Food> of = this.orderFoodService.getOrderFoods();


        return new ResponseEntity(of != null ? of : "{}", HttpStatus.OK);
    }
}
