package com.ftn.contoller;

import com.ftn.domain.DTO.UserDTO;
import com.ftn.domain.Guest;
import com.ftn.domain.User;
import com.ftn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by EmulatE on 10-May-17.
 */
@RestController
public class UserController {
    @Autowired
    UserService userService;

//    @CrossOrigin
//    @RequestMapping(value = "/upis" , method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<User> upis(@RequestBody User user) throws Exception {
//       // User pera = new User("pera","peric","email@yahoo.com","123");
//        System.out.println("pre save");
//        User vracen = userService.save(user);
//        System.out.println("OVDEEEE");
//        return  new ResponseEntity<User>(vracen, HttpStatus.OK);
//    }

    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO g) {
        System.out.println("Password: " + g.getPassword());
        User user =  this.userService.login(g.getEmail(), g.getPassword());

        return new ResponseEntity(user != null ? user : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> register(@RequestBody Guest g) {
        Guest guest =  this.userService.register(g.getFirst_name(), g.getLast_name(), g.getEmail(), g.getPassword());

        return new ResponseEntity(guest != null ? guest : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/waiter/change/password", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> changeWaiterPassword(@RequestBody UserDTO g) {
        User user =  this.userService.updateWaiterPassword(g.getEmail(), g.getPassword());

        return new ResponseEntity(user != null ? user : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/cook/change/password", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> changeCookPassword(@RequestBody UserDTO g) {
        User user =  this.userService.updateCookPassword(g.getEmail(), g.getPassword());

        return new ResponseEntity(user != null ? user : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/bartender/change/password", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> changeBartenderPassword(@RequestBody UserDTO g) {
        User user =  this.userService.updateBartenderPassword(g.getEmail(), g.getPassword());

        return new ResponseEntity(user != null ? user : "{}", HttpStatus.OK);
    }
}
