package com.ftn.contoller;

import com.ftn.domain.Drink;
import com.ftn.service.DrinkService;
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
public class DrinkController {


    @Autowired
    private DrinkService drinkService;



    @CrossOrigin
    @RequestMapping(value = "/alldrinks", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Drink> dajpice() {
        List<Drink> fs = drinkService.getDrinks();
        System.out.println("velicina liste pica je " + fs.size());
        return new ResponseEntity(fs != null ? fs : "{}", HttpStatus.OK);
    }


}