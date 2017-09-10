package com.ftn.contoller;

import com.ftn.domain.*;
import com.ftn.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Momir on 5/14/2017.
 */
@RestController
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private FriendsService friendsService;
    @Autowired
    private VisitService visitService;

    @CrossOrigin
    @RequestMapping(value = "/restaurants", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Restaurant> dajRestorane(@RequestBody String email) {
        // email je da znam za cije prijatelje dajem prosecnu ocenu
        System.out.println("DAJEM REST");
        List<Restaurant> restaurants = restaurantService.getRestaurants();

        /////////////////////////// prijatelji
        List<Guest> guests = friendsService.getGuests();
        List<Friendship> fs = friendsService.getFriendshipsByEmailPrvog(email);
        List<Guest> prijatelji = new ArrayList<Guest>();

        for ( Friendship a : fs)
        {
            for (Guest gu : guests)
            {
                if (gu.getEmail().equals(a.getEmailDrugog()))
                {
                    prijatelji.add(gu);
                }
            }
        }

        ////////////////////////////
        List<Visit> g = visitService.getAll();

        for (Restaurant r : restaurants)
        {
            int koliko = 0;
            double ukupno = 0.0f;
            for ( Visit v : g)
            {
                if (v.getNazivRestorana().equals(r.getName()))
                {
                    ukupno+=v.getOcena();
                    koliko++;
                }
            }
            if (ukupno!=0)
            {
                r.setRating(ukupno/koliko);
            }
            if ( prijatelji.size() >0) {
                ukupno = 0;
                koliko = 0;
                for (Visit v : g) {
                    if (v.getNazivRestorana().equals(r.getName())) {
                        for (Guest p : prijatelji) {
                            if (p.getEmail().equals(v.getEmail()))
                            {
                                ukupno+=v.getOcena();
                                koliko++;
                            }
                        }
                    }
                }
                if (ukupno!=0)
                {
                    r.setFriendRating(ukupno/koliko);
                }
            }

        }

        return new ResponseEntity(restaurants != null ? restaurants : "{}", HttpStatus.OK);
    }
}
