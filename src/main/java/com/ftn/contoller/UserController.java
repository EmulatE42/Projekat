package com.ftn.contoller;

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
@RequestMapping(value = "/guest")
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
    public ResponseEntity<Guest> login(@RequestBody Guest g) {
        System.out.println("Password: " + g.getPassword());
        Guest guest =  this.userService.login(g.getEmail(), g.getPassword());

        return new ResponseEntity(guest != null ? guest : "{}", HttpStatus.OK);
    }
}
