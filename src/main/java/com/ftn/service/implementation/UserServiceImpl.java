package com.ftn.service.implementation;

import com.ftn.domain.Guest;
import com.ftn.domain.User;
import com.ftn.repository.UserRepository;
import com.ftn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 10-May-17.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findOne(Integer id) {
       User user = userRepository.findOne(id);
       return user;
    }
    @Override
    public Guest save(Guest guest)  {
        return userRepository.save(guest);
    }

    @Override
    public Guest login(String email, String password)  {
        System.out.println("Email: " + email);
        //save(new Guest("momir", "kostic", "mail", "pass", false)); //ovo sam dodao posto jos uvek nismo napravili formu za registraciju gosta
        Guest guest = userRepository.findAllByEmailAndPassword(email, password);

        if(guest != null)
            return guest;
        else {
            return null;
        }
    }

    @Override
    public Guest register(String firstname, String lastname, String email, String password) {
        Guest guest = userRepository.findByEmail(email);

        if(guest == null)
        {
            Guest registerGuest = new Guest(firstname, lastname, email, password, false);
            save(registerGuest);
            return registerGuest;
        }
        else
            return null;
    }
}
