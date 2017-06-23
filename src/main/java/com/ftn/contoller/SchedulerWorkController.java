package com.ftn.contoller;

import com.ftn.domain.DTO.UserDTO;
import com.ftn.domain.SchedulerWork;
import com.ftn.domain.User;
import com.ftn.service.SchedulerWorkService;
import com.ftn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Momir on 6/23/2017.
 */
@RestController
public class SchedulerWorkController {

    @Autowired
    SchedulerWorkService schedulerWorkService;

    @CrossOrigin
    @RequestMapping(value = "/scheduler_work/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SchedulerWork> getSchedulerWork(@PathVariable String userId) {
        System.out.println("Usao breeee");
        SchedulerWork sc = this.schedulerWorkService.findByUserID(Integer.parseInt(userId));

        System.out.println("Velicina niza: " + sc.getTables().size());

        return new ResponseEntity(sc != null ? sc : "{}", HttpStatus.OK);
    }
}
