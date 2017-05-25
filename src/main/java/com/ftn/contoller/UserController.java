package com.ftn.contoller;

import com.ftn.domain.*;
import com.ftn.domain.DTO.UserDTO;
import com.ftn.service.MailService;
import com.ftn.service.UserService;
import com.ftn.service.VerificationGuestService;
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


    private final VerificationGuestService verificationGuestService;
    private final MailService mailService;
    @Autowired
    public UserController(UserService userService, MailService mailService,VerificationGuestService verificationGuestService )
    {

        this.verificationGuestService = verificationGuestService;

        this.userService = userService;
        this.mailService = mailService;

    }


    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO g) {
        System.out.println("Password: " + g.getPassword());
        User user = this.userService.login(g.getEmail(), g.getPassword());
        UserDTO userDTO = converte(user);

        return new ResponseEntity(userDTO != null ? userDTO : "{}", HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> register(@RequestBody Guest g) {
        Guest guest =  this.userService.register(g.getFirst_name(), g.getLast_name(), g.getEmail(), g.getPassword());
        //System.out.println("SA OVIM CEPAM " + g.getEmail());
        verificationGuestService.save(new VerificationGuest(g.getEmail()));
        String token = verificationGuestService.getTokenByUserEmail(g.getEmail());
        mailService.sendUserActivationEmail(guest, token);
        return new ResponseEntity(guest != null ? guest : "{}", HttpStatus.CREATED);
    }




    @RequestMapping(value = "/{email}/{verificationTokenValue}",
            method = RequestMethod.GET)
    public ResponseEntity activateUser(@PathVariable("email") String email,
                                       @PathVariable("token") String token)
    {
        if (userService.findByEmail(email) == null)
            return new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);

        verificationGuestService.activateGuest(email,token);
        return new ResponseEntity(HttpStatus.OK);
    }



    @CrossOrigin
    @RequestMapping(value = "/guest/change/password", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> changeGuestPassword(@RequestBody UserDTO g) {
        User user =  this.userService.updateGuestPassword(g.getEmail(), g.getPassword());

        return new ResponseEntity(user != null ? user : "{}", HttpStatus.OK);
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
    @CrossOrigin
    @RequestMapping(value = "/guest/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> updateGuest(@RequestBody Guest w) {
        Guest guest = this.userService.updateGuest(w.getId(), w.getFirst_name(), w.getLast_name(), w.getAvatar(), w.getAdresa());

        return new ResponseEntity(guest, HttpStatus.OK);
    }
    @CrossOrigin
    @RequestMapping(value = "/waiter/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Waiter> updateWaiter(@RequestBody Waiter w) {
        Waiter waiter = this.userService.updateWaiter(w.getId(), w.getFirst_name(), w.getLast_name(), w.getAvatar(), w.getBirth(), w.getDressSize(), w.getShoeSize());

        return new ResponseEntity(waiter, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/cook/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cook> updateCook(@RequestBody Cook w) {
        Cook cook = this.userService.updateCook(w.getId(), w.getFirst_name(), w.getLast_name(), w.getAvatar(), w.getBirth(), w.getDressSize(), w.getShoeSize());

        return new ResponseEntity(cook, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/bartender/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Bartender> updateBartedner(@RequestBody Bartender w) {
        Bartender bartender = this.userService.updateBartender(w.getId(), w.getFirst_name(), w.getLast_name(), w.getAvatar(), w.getBirth(), w.getDressSize(), w.getShoeSize());

        return new ResponseEntity(bartender, HttpStatus.OK);
    }

    public UserDTO converte(User user)
    {
        UserDTO userDTO = null;

        if(user != null) {
            switch (((User) user).getRole()) {
                case GOST: {
                    userDTO = new UserDTO((Guest) user);
                    return userDTO;
                }
                case KONOBAR: {
                    userDTO = new UserDTO((Waiter) user);
                    return userDTO;
                }
                case KUVAR: {
                    userDTO = new UserDTO((Cook) user);
                    return userDTO;
                }

                case SANKER: {
                    userDTO = new UserDTO((Bartender) user);
                    return userDTO;
                }
                default:
                    return null;
            }
        }
        return null;
    }
}
