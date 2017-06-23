package com.ftn.contoller;

import com.ftn.domain.Friendship;
import com.ftn.domain.Guest;
import com.ftn.domain.VerificationGuest;
import com.ftn.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by EmulatE on 25-May-17.
 */
@RestController
public class FriendsController {


    @Autowired
    private FriendsService friendsService;


 // /obrisiPrijateljstvo


    @CrossOrigin
    @RequestMapping(value = "/obrisiPrijateljstvo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Friendship> ukloniPrijateljstvo(@RequestBody String f) {
        System.out.println("asd");
        String []elemetni = f.split(";");
        Friendship a = new Friendship();
        a.setEmailPrvog(elemetni[0]);
        a.setEmailDrugog(elemetni[1]);
        System.out.println('\n' + "DOBIO SAM  " + elemetni[0] + " " + elemetni[1] + '\n');

        this.friendsService.delete(elemetni[0],elemetni[1]);

        return new ResponseEntity(a != null ? a : "{}", HttpStatus.CREATED);

    }



    @CrossOrigin
    @RequestMapping(value = "/dodajPrijateljstvo", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Friendship> napraviPrijateljstvo(@RequestBody String f) {
        String []elemetni = f.split(";");

        System.out.println('\n' + "DOBIO SAM  " + elemetni[0] + " " + elemetni[1] + '\n');
        Friendship a = new Friendship();
        a.setEmailPrvog(elemetni[0]);
        a.setEmailDrugog(elemetni[1]);
        Friendship friendship =  this.friendsService.save(a);
        System.out.println('\n' + "Snimio sam " + a.getEmailPrvog() + " " + a.getEmailDrugog() + '\n');
        return new ResponseEntity(friendship != null ? friendship : "{}", HttpStatus.CREATED);

    }


    @CrossOrigin
    @RequestMapping(value = "/allGuests", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> nadjiSve() {


        List<Guest> guests = friendsService.getGuests();
        System.out.println("velicina liste je " + guests.size());
        return new ResponseEntity(guests != null ? guests : "{}", HttpStatus.OK);
    }


    @CrossOrigin
    @RequestMapping(value = "/friends", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> nadjiPrijatelje(@RequestBody String ko) {

        System.out.print("TRENUTNI ULOGOVAN JE " + ko);
        List<Guest> guests = friendsService.getGuests();
        List<Friendship> fs = friendsService.getFriendshipsByEmailPrvog(ko);
        List<Guest> g = new ArrayList<Guest>();

        for ( Friendship a : fs)
        {
            for (Guest gu : guests)
            {
                if (gu.getEmail().equals(a.getEmailDrugog()))
                {
                    g.add(gu);
                }
            }
        }
       // System.out.println("velicina liste je " + guests.size());
        return new ResponseEntity(g != null ? g : "{}", HttpStatus.OK);
    }
}
