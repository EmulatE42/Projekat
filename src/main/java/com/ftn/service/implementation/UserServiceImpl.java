package com.ftn.service.implementation;

import com.ftn.domain.*;
import com.ftn.repository.SchedulerWorkRepository;
import com.ftn.repository.UserRepository;
import com.ftn.repository.VerificationTokenRepository;
import com.ftn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.ftn.domain.Role.GOST;

/**
 * Created by EmulatE on 10-May-17.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchedulerWorkRepository schedulerWorkRepository;


    @Override
    public User findOne(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public Guest save(Guest guest)  {
        return userRepository.save(guest);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
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
            String start_dt = "2001-05-01";
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            try {
                Date date = (Date)formatter.parse(start_dt);

                Waiter waiter = new Waiter("Pera", "Peric", "pera@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook = new Cook("Mika", "Mikic", "mika@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender = new Bartender("Laza", "Lazic", "laza@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter.setStartTime("08:00");
                waiter.setEndTime("15:00");
                waiter.setRestaurantName("Aman");


                cook.setStartTime("08:00");
                cook.setEndTime("15:00");
                cook.setRestaurantName("Aman");

                bartender.setStartTime("08:00");
                bartender.setEndTime("15:00");
                bartender.setRestaurantName("Aman");


                this.userRepository.save(waiter);
                this.userRepository.save(cook);
                this.userRepository.save(bartender);





                Waiter waiter1 = new Waiter("Nikola", "Nikolic", "nikola@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook1 = new Cook("Nemanja", "Nemanjic", "nemanja@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender1 = new Bartender("Jovan", "Jovanov", "jovan@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter1.setStartTime("15:00");
                waiter1.setEndTime("22:00");
                waiter1.setRestaurantName("Aman");


                cook1.setStartTime("15:00");
                cook1.setEndTime("22:00");
                cook1.setRestaurantName("Aman");

                bartender1.setStartTime("15:00");
                bartender1.setEndTime("22:00");
                bartender1.setRestaurantName("Aman");


                this.userRepository.save(waiter1);
                this.userRepository.save(cook1);
                this.userRepository.save(bartender1);
                //this.userRepository.save(supplier);

                List<Integer> tables = new ArrayList<>();
                tables.add(1);
                tables.add(2);
                tables.add(3);

                User user = this.userRepository.findByEmail("nikola@gmail.com");
                SchedulerWork sw = new SchedulerWork(user.getId(), "07:00:00", "16:00:00", tables);
                this.schedulerWorkRepository.save(sw);

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
                case PONUDJAC: {
                    System.out.println("Ponudjac : " + ((User) user).getFirst_name());
                    return (Supplier) user;
                }
                default:
                    return null;
            }
        }
        return null;
    }

    @Override
    public Guest register(String firstname, String lastname, String email, String password) {
        try {
            Guest guest = (Guest) userRepository.findByEmail(email);

            if(guest == null)
            {
                Guest registerGuest = new Guest(firstname, lastname, email, password, GOST, false,null);
                save(registerGuest);
                return registerGuest;
            }
            else
                return null;
        }catch(Exception e)
        {
            return null;
        }


    }


    @Override
    public User updateGuestPassword(String email, String password) {
        this.userRepository.updateGuestPassword(email, password);
        User user = userRepository.findAllByEmailAndPassword(email, password);
        return user;
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

    @Override
    public User updateSupplierPassword(String email, String password) {
        this.userRepository.updateSupplierPassword(email, password);
        User user = userRepository.findAllByEmailAndPassword(email, password);
        return user;
    }

    @Override
    public Waiter updateWaiter(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize) {
        userRepository.updateWaiter(id, firstname, lastname, avatar, birth, dressSize, shoeSize);
        Waiter waiter = (Waiter) userRepository.findById(id);

        return waiter;

    }

    @Override
    public Cook updateCook(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize) {
        userRepository.updateCook(id, firstname, lastname, avatar, birth, dressSize, shoeSize);
        Cook cook = userRepository.getCook(id);

        return cook;
    }

    @Override
    public Bartender updateBartender(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize) {
        userRepository.updateBartender(id, firstname, lastname, avatar, birth, dressSize, shoeSize);
        Bartender bartender = userRepository.getBartender(id);

        return bartender;
    }

    @Override
    public Guest updateGuest(Integer id, String first_name, String last_name, String avatar, String adresa) {
        userRepository.updateGuest(id, first_name, last_name, avatar, adresa);
        Guest guest = userRepository.getGuest(id);

        return guest;
    }

    @Override
    public Supplier updateSupplier(int id, String firstname, String lastname, String avatar, Date birth) {
        userRepository.updateSupplier(id, firstname, lastname, avatar, birth);
        Supplier supplier = userRepository.getSupplier(id);

        return supplier;
    }


}
