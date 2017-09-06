package com.ftn.sw40;

import com.ftn.domain.Guest;
import com.ftn.repository.UserRepository;
import com.ftn.service.implementation.FriendsServiceImpl;
import com.ftn.service.implementation.UserServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by EmulatE on 06-Sep-17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class sw40Tests {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userServiceimpl;
    @Autowired
    private FriendsServiceImpl friendsService;
    @Test
    public void testReg() {

        userServiceimpl.register("Pera","Peric","testEmail","testSifra");
        Guest temp = (Guest) userRepository.findAllByEmailAndPassword("testEmail","testSifra");
        System.out.println("Vratio sam " + temp.getEmail());

        List<Guest> t = friendsService.getGuests();
        for (Guest g:t) {
            System.out.println("ime je " + g.getFirst_name());
        }
        assertEquals(temp.getEmail(),"testEmail");


    }

    @Test
    public void testLog() {

        userServiceimpl.register("Mika","Mikic","miki@gmail.com","miki123");
        Guest temp = (Guest) userRepository.findAllByEmailAndPassword("miki@gmail.com","miki123");
        System.out.println("Vratio sam LOG " + temp.getEmail());
        Guest rez = (Guest) userServiceimpl.login(temp.getEmail(),temp.getPassword());
        System.out.println("Vratio sam LOG2 " + rez.getEmail());
        assertEquals(rez.getEmail(),temp.getEmail());


    }
}
