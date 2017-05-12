package com.ftn.com.ftn.contoller;

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

    @CrossOrigin
    @RequestMapping(value = "/upis" , method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> upis(@RequestBody User user) throws Exception {
       // User pera = new User("pera","peric","email@yahoo.com","123");
        System.out.println("pre save");
        User vracen = userService.save(user);
        System.out.println("OVDEEEE");
        return  new ResponseEntity<User>(vracen, HttpStatus.OK);
    }
}
