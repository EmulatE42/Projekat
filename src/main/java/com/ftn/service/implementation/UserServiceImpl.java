package com.ftn.service.implementation;

import com.ftn.domain.*;
import com.ftn.repository.UserRepository;
import com.ftn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.ftn.domain.Role.GOST;

/**
 * Created by EmulatE on 10-May-17.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public Guest save(Guest guest)  {
        return userRepository.save(guest);
    }

    @Override
    public Integer deleteUserByEmail(String email) {
        Integer a = userRepository.deleteUserByEmail(email);
        return a;
    }

    @Override
    public User login(String email, String password)  {
        System.out.println("Email: " + email);

        ///////HARDCODE
        if(this.userRepository.getWaiters().size() == 0) {
            System.out.println("Usao ovde!");
            String str_date="11-June-16";
            DateFormat formatter ;
            Date date ;
            formatter = new SimpleDateFormat("dd-MMM-yy");
            try {
                date = formatter.parse(str_date);

                Waiter waiter = new Waiter("Pera", "Peric", "pera@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook = new Cook("Mika", "Mikic", "mika@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender = new Bartender("Laza", "Lazic", "laza@gmail.com", "pass", Role.SANKER, date, 23, 45, false);


                this.userRepository.save(waiter);
                this.userRepository.save(cook);
                this.userRepository.save(bartender);

            } catch (ParseException e) {
                e.printStackTrace();
            }


        }
        System.out.println("Tabela ima " + this.userRepository.getWaiters().size());
        ///////HARDCODE

        Object user = userRepository.findAllByEmailAndPassword(email, password);
        if(user != null) {
            switch (((User) user).getRole()) {
                case GOST: {
                    return (Guest) user;
                }
                case KONOBAR: {
                    return (Waiter) user;
                }
                case KUVAR: {
                    return (Cook) user;
                }

                case SANKER: {
                    return (Bartender) user;
                }
                default:
                    return null;
            }
        }
        return null;
    }

    @Override
    public Guest register(String firstname, String lastname, String email, String password) {
        Guest guest = (Guest) userRepository.findByEmail(email);

        if(guest == null)
        {
            Guest registerGuest = new Guest(firstname, lastname, email, password, GOST, false);
            save(registerGuest);
            return registerGuest;
        }
        else
            return null;
    }

    @Override
    public User updateWaiterPassword(String email, String password) {
        this.userRepository.updateWaiterPassword(email, password);
        User user = userRepository.findAllByEmailAndPassword(email, password);
        return user;
    }

    @Override
    public User updateCookPassword(String email, String password) {
        this.userRepository.updateCookPassword(email, password);
        User user = userRepository.findAllByEmailAndPassword(email, password);
        return user;
    }

    @Override
    public User updateBartenderPassword(String email, String password) {
        this.userRepository.updateBartenderPassword(email, password);
        User user = userRepository.findAllByEmailAndPassword(email, password);
        return user;
    }


}
