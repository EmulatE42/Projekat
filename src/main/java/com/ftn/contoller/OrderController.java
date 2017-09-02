package com.ftn.contoller;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.ftn.domain.*;
import com.ftn.domain.DTO.UserDTO;
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


    @CrossOrigin
    @RequestMapping(value = "/orders", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Set<Order> >getOrders() {

        Set<Order> orders = this.orderService.getOrders();

        Order a = new Order();
        for (Order o: orders) {
//            System.out.println("Naziv: " + o.getNazivRestorana());
//
//            for (Order_Food of: o.getOrder_foods()) {
//                if(of.getOrder().getId() == o.getId())
//                {
//                    System.out.println("\tHrana: " + of.getFood().getName());
//                }
//            }

            a=o;
        }
        //System.out.println("IZASAO SAM");
        return new ResponseEntity(orders != null ? orders : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/add_order",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order> addOrder(@RequestBody  Order order) {

        System.out.println("Naziv restorana: " + order.getNazivRestorana());
        this.orderService.saveOrder(order);

        return new ResponseEntity(order != null ? order : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/provera",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> provera(@RequestBody  String order) {

        System.out.println("USAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        //this.orderService.saveOrder(order);

        return new ResponseEntity(order != null ? order : "{}", HttpStatus.OK);
    }

}
