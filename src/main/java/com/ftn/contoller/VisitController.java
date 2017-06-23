package com.ftn.contoller;

import com.ftn.domain.Visit;
import com.ftn.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by EmulatE on 23-Jun-17.
 */
@RestController
public class VisitController {

@Autowired
 private VisitRepository visitRepository;

    @CrossOrigin
    @RequestMapping(value = "/visitsForOne", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Visit> nadjiPosete(@RequestBody String ko) {


        List<Visit> g = visitRepository.findVisitsByEmail(ko);


        // System.out.println("velicina liste je " + guests.size());
        return new ResponseEntity(g != null ? g : "{}", HttpStatus.OK);
    }



    @CrossOrigin
    @RequestMapping(value = "/dodajVisit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Visit> dodajVis(@RequestBody String f) {

        String []elemetni = f.split(";");
        Visit a = new Visit();
        a.setEmail(elemetni[0]);
        a.setNazivRestorana(elemetni[1]);
        a.setDatum(elemetni[2]);

        System.out.println('\n' + "DOBIO SAM  " + elemetni[0] + " " + elemetni[1] + '\n');

       Visit t =  visitRepository.save(a);

        return new ResponseEntity(t != null ? t : "{}", HttpStatus.CREATED);

    }


}
