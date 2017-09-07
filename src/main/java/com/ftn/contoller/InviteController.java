package com.ftn.contoller;

import com.ftn.domain.FriendRequest;
import com.ftn.domain.Friendship;
import com.ftn.domain.Guest;
import com.ftn.domain.Invite;
import com.ftn.service.FriendsService;
import com.ftn.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by EmulatE on 07-Sep-17.
 */
@RestController
public class InviteController {

    @Autowired
    InviteService inviteService;

    @Autowired
    private FriendsService friendsService;

    @CrossOrigin
    @RequestMapping(value = "/obrisiPoziv", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Invite> ukloniPoziv(@RequestBody String f) {
        System.out.println("asd");
        String []elemetni = f.split(";");
        Invite a = new Invite();
        a.setPoslao(elemetni[0]);
        a.setPrimio(elemetni[1]);
        a.setIdPorudzbine(Integer.parseInt(elemetni[2]));
        System.out.println('\n' + "DOBIO SAM ZA BRISANJE HAHAHA XD " + elemetni[0] + " " + elemetni[1] + " " + elemetni[2] + '\n');

        this.inviteService.delete(elemetni[0],elemetni[1],a.getIdPorudzbine());

        return new ResponseEntity(a != null ? a : "{}", HttpStatus.CREATED);

    }

    @CrossOrigin
    @RequestMapping(value = "/dodajPoziv", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Invite> napraviPoziv(@RequestBody Invite f) {


       // System.out.println('\n' + "DOBIO SAM za snimanje  " + elemetni[0] + " " + elemetni[1] + " " + elemetni[2] + '\n');

        Invite a = this.inviteService.save(f);
        return new ResponseEntity(a != null ? a : "{}", HttpStatus.CREATED);

    }
    @CrossOrigin
    @RequestMapping(value = "/nadjiSvePozive", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Invite> pronadjiSvePozive(@RequestBody String f) {


        List<Invite> sviMoji = this.inviteService.findInvitesByPrimio(f);
        List<Guest> gosti = this.friendsService.getGuests();
        List<Guest> ret = new ArrayList<Guest>();
        for ( Invite i : sviMoji) {

            for (Guest g : gosti)
            {
                if (g.getEmail().equals(i.getPoslao()))
                {
                    i.setImeRestorana(i.getImeRestorana() + ";" + g.getFirst_name() + ";" + g.getLast_name());
                    //System.out.print("OSOBA SA MAILOM " + ko + " je POSLALA ZAHTEV OSOBI " + g.getEmail());
                }
            }
        }
        return new ResponseEntity(sviMoji != null ? sviMoji : "{}", HttpStatus.CREATED);

    }
}
