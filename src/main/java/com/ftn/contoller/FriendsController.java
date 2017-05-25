package com.ftn.contoller;

import com.ftn.domain.Guest;
import com.ftn.service.FriendsService;
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
 * Created by EmulatE on 25-May-17.
 */
@RestController
public class FriendsController {


    @Autowired
    private FriendsService friendsService;


    @CrossOrigin
    @RequestMapping(value = "/friends", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> login() {

        List<Guest> guests = friendsService.getGuests();
        return new ResponseEntity(guests != null ? guests : "{}", HttpStatus.OK);
    }
}