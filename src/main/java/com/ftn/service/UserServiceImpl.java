package com.ftn.service;

import com.ftn.domain.Guest;
import com.ftn.domain.User;
import com.ftn.repository.UserRepository;
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
    public User save(User user) throws Exception {
        return userRepository.save(user);
    }

    @Override
    public Guest login(String email, String password) {
        System.out.println("Email: " + email);
        Guest guest = userRepository.findAllByEmailAndPassword(email, password);

        if(guest != null)
            return guest;
        else {
            System.out.println("Nista nije nasao!");
            return null;
        }
    }


}
