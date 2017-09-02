package com.ftn.contoller;

import com.ftn.domain.FriendRequest;
import com.ftn.domain.Friendship;
import com.ftn.domain.Guest;
import com.ftn.service.FriendRequestService;
import com.ftn.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by EmulatE on 01-Sep-17.
 */

@RestController
public class FriendRequestController {

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private FriendsService friendsService;

    @CrossOrigin
    @RequestMapping(value = "/dodajZahtev", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FriendRequest> napraviZahrev(@RequestBody String f) {
        String []elemetni = f.split(";");

        System.out.println('\n' + "DOBIO SAM  " + elemetni[0] + " " + elemetni[1] + '\n');
        FriendRequest a = new FriendRequest();
        a.setUputio(elemetni[0]);
        a.setDobio(elemetni[1]);
        FriendRequest friendRequest =  this.friendRequestService.save(a);
        System.out.println('\n' + "Snimio sam " + a.getUputio() + " " + a.getDobio() + '\n');
        return new ResponseEntity(friendRequest != null ? friendRequest : "{}", HttpStatus.CREATED);

    }

    @CrossOrigin
    @RequestMapping(value = "/obrisiZahtev", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FriendRequest> ukloniZahtev(@RequestBody String f) {

        String []elemetni = f.split(";");
        FriendRequest a = new FriendRequest();
        a.setUputio(elemetni[0]);
        a.setDobio(elemetni[1]);
        System.out.println('\n' + "DOBIO SAM  " + elemetni[0] + " " + elemetni[1] + '\n');

        this.friendRequestService.delete(elemetni[0],elemetni[1]);

        return new ResponseEntity(a != null ? a : "{}", HttpStatus.CREATED);

    }

    @CrossOrigin // daj sve zahteve koje je ova osoba poslala
    @RequestMapping(value = "/nadjiPoslateZahteve", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Guest> pronadjiPoslateZahteve(@RequestBody String ko) {

        List<FriendRequest> fs = friendRequestService.findFriendRequestsByUputio(ko);
        List<Guest> guests = friendsService.getGuests();
        List<Guest> ret = new ArrayList<Guest>();
        for ( FriendRequest f : fs) {

            for (Guest g : guests)
            {
                if (g.getEmail().equals(f.getDobio()))
                {
                    ret.add(g);
                    System.out.print("OSOBA SA MAILOM " + ko + " je POSLALA ZAHTEV OSOBI " + g.getEmail());
                }
            }
        }

         System.out.println("velicina liste kod POSLATIH  je " + fs.size());
        return new ResponseEntity(ret != null ? ret : "{}", HttpStatus.OK);
    }


    @CrossOrigin // daj sve zahteve koje je ova osoba dobila
    @RequestMapping(value = "/nadjiPrimljeneZahteve", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FriendRequest> pronadjiPrimljeneZahteve(@RequestBody String ko) {

        List<FriendRequest> fs = friendRequestService.findFriendRequestsByDobio(ko);
        List<Guest> guests = friendsService.getGuests();
        List<Guest> ret = new ArrayList<Guest>();
        for ( FriendRequest f : fs) {

            for (Guest g : guests)
            {
                if (g.getEmail().equals(f.getUputio()))
                {
                    ret.add(g);
                    System.out.print("OSOBA SA MAILOM " + ko + " je DOBILA ZAHTEV OD " + g.getEmail());
                }
            }
        }
        System.out.println("velicina liste kod PRIMLJENIH je " + fs.size());
        return new ResponseEntity(ret != null ? ret : "{}", HttpStatus.OK);
    }


}
