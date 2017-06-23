package com.ftn.contoller;

import com.ftn.domain.Food;
import com.ftn.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@RestController
public class FoodController {


    @Autowired
    private FoodService foodService;



    @CrossOrigin
    @RequestMapping(value = "/allfoods", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Food> dajhranu() {
        List<Food> fs = foodService.getFoods();
        System.out.println("velicina liste HRANE je " + fs.size());
        return new ResponseEntity(fs != null ? fs : "{}", HttpStatus.OK);
    }


}
