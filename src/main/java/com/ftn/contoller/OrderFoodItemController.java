package com.ftn.contoller;

import com.ftn.domain.OrderDrinkItem;
import com.ftn.domain.OrderFoodItem;
import com.ftn.service.OrderFoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@RestController
public class OrderFoodItemController {
    @Autowired
    private OrderFoodItemService orderFoodItemService;

    @CrossOrigin
    @RequestMapping(value = "/upisiOrderFoodItem", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderFoodItem> login(@RequestBody OrderFoodItem g) {
        OrderFoodItem a = orderFoodItemService.save(g);
        return new ResponseEntity(a != null ? a : "{}", HttpStatus.OK);
    }


}
