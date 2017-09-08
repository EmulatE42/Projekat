package com.ftn.contoller;

import com.ftn.domain.Order_Drink;
import com.ftn.domain.Order_Food;
import com.ftn.service.OrderDrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Momir on 03.09.2017.
 */
@RestController
public class OrderDrinkController {

    @Autowired
    private OrderDrinkService orderDrinkService;

    @CrossOrigin
    @RequestMapping(value = "/add_order_drink",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order_Drink> addOrderDrink(@RequestBody Order_Drink order_drink) {
        System.out.println("ID: " + order_drink.getOrder_drink_id());
        this.orderDrinkService.save(order_drink);

        return new ResponseEntity(order_drink != null ? order_drink : "{}", HttpStatus.OK);
    }


    @CrossOrigin
    @RequestMapping(value = "/order_drinks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Order_Drink>> getOrderDrinks() {

        List<Order_Drink> od = this.orderDrinkService.getOrderDrinks();


        return new ResponseEntity(od != null ? od : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/update_order_drink_ready",  method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order_Drink> updateOrderDrinkReady(@RequestBody Order_Drink order_drink) {

        this.orderDrinkService.updateReady(order_drink.getOrder_drink_id());

        return new ResponseEntity("{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/delete_order_drink",  method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order_Drink> deleteOrderFood(@RequestBody Order_Drink order_drink) {

        this.orderDrinkService.delteOrderDrinks(order_drink.getOrder_drink_id());
        return new ResponseEntity("{}", HttpStatus.OK);
    }
}
