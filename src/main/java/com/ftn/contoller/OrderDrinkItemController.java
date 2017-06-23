package com.ftn.contoller;

import com.ftn.domain.Drink;
import com.ftn.domain.OrderDrinkItem;
import com.ftn.service.OrderDrinkItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sound.midi.SysexMessage;
import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@RestController
public class OrderDrinkItemController {
    @Autowired
    private OrderDrinkItemService orderDrinkItemService;


    @CrossOrigin
    @RequestMapping(value = "/upisiOrderDrinkItem", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderDrinkItem> upisiodi(@RequestBody OrderDrinkItem g) {
       // System.out.println(" dobio sam rest " + g.getNazivRestorana() + "VELICINA LSITE JE " +  g.getDrinks().size());
      //  System.out.println();
       /// for (Drink d : g.getDrinks())
       // {
           // System.out.println("evo nas " + d.getName());
      //  }
       // System.out.println();
        OrderDrinkItem a = orderDrinkItemService.save(g);
        //System.out.print("SNIMIO SAM U BAZU HAHAHAH velicina liste njegova " + (a.getDrinks().size()));
        return new ResponseEntity(a != null ? a : "{}", HttpStatus.OK);
    }

    /*@CrossOrigin
    @RequestMapping(value = "/restaurants", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Restaurant> dajRestorane() {
        System.out.println("DAJEM REST");
        List<Restaurant> restaurants = restaurantService.getRestaurants();
        return new ResponseEntity(restaurants != null ? restaurants : "{}", HttpStatus.OK);
    }*/

        @CrossOrigin
    @RequestMapping(value = "/OrderDrinkItems", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<OrderDrinkItem> dajOrderDrinkItems() {
            System.out.println("DAJEM SVE DRINK ITEMEEEEEE");
            List<OrderDrinkItem> r = orderDrinkItemService.getOrderDrinkItems();

            for (OrderDrinkItem a : r)
            {
                System.out.println("OVO NEMOJ DA BUDE 0  : " + a.getDrinks().size()  );
            }
            return new ResponseEntity(r != null ? r : "{}", HttpStatus.OK);
        }


}
