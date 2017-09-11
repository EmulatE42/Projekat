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

                waiter.setStartTime("06:00");
                waiter.setEndTime("14:00");
                waiter.setRestaurantName("Aman");


                cook.setStartTime("06:00");
                cook.setEndTime("14:00");
                cook.setRestaurantName("Aman");

                bartender.setStartTime("06:00");
                bartender.setEndTime("14:00");
                bartender.setRestaurantName("Aman");


                this.userRepository.save(waiter);
                this.userRepository.save(cook);
                this.userRepository.save(bartender);


                Waiter waiter1 = new Waiter("Nikola", "Nikolic", "nikola@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook1 = new Cook("Nemanja", "Nemanjic", "nemanja@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender1 = new Bartender("Jovan", "Jovanov", "jovan@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter1.setStartTime("14:00");
                waiter1.setEndTime("22:00");
                waiter1.setRestaurantName("Aman");


                cook1.setStartTime("14:00");
                cook1.setEndTime("22:00");
                cook1.setRestaurantName("Aman");

                bartender1.setStartTime("14:00");
                bartender1.setEndTime("22:00");
                bartender1.setRestaurantName("Aman");


                this.userRepository.save(waiter1);
                this.userRepository.save(cook1);
                this.userRepository.save(bartender1);
                //this.userRepository.save(supplier);

                List<Integer> tables = new ArrayList<>();
                tables.add(5);
                tables.add(6);
                tables.add(7);
                tables.add(8);
                tables.add(9);

                List<Integer> tables2 = new ArrayList<>();
                tables2.add(1);
                tables2.add(2);
                tables2.add(3);
                tables2.add(4);

                User user = this.userRepository.findByEmail("nikola@gmail.com");
                User user1 = this.userRepository.findByEmail("pera@gmail.com");
                SchedulerWork sw = new SchedulerWork(user.getId(), "14:00:00", "22:00:00", tables);
                SchedulerWork sw1 = new SchedulerWork(user1.getId(), "06:00:00", "14:00:00", tables2);
                this.schedulerWorkRepository.save(sw);
                this.schedulerWorkRepository.save(sw1);

                //////////////////////ISPOD SACA////////////////////////////////////

                Waiter waiter2 = new Waiter("Momir", "Kostic", "prvi1@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook2 = new Cook("Aca", "Acic", "drugi1@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender2 = new Bartender("Milan", "Milanovic", "treci1@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter2.setStartTime("06:00");
                waiter2.setEndTime("14:00");
                waiter2.setRestaurantName("Ispod saca");


                cook2.setStartTime("06:00");
                cook2.setEndTime("14:00");
                cook2.setRestaurantName("Ispod saca");

                bartender2.setStartTime("06:00");
                bartender2.setEndTime("14:00");
                bartender2.setRestaurantName("Ispod saca");


                this.userRepository.save(waiter2);
                this.userRepository.save(cook2);
                this.userRepository.save(bartender2);


                Waiter waiter3 = new Waiter("Stojan", "Stojanovic", "prvi2@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook3 = new Cook("Stefan", "Stefanovic", "drugi2@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender3 = new Bartender("Brane", "Branic", "treci2@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter3.setStartTime("14:00");
                waiter3.setEndTime("22:00");
                waiter3.setRestaurantName("Ispod saca");


                cook3.setStartTime("14:00");
                cook3.setEndTime("22:00");
                cook3.setRestaurantName("Ispod saca");

                bartender3.setStartTime("14:00");
                bartender3.setEndTime("22:00");
                bartender3.setRestaurantName("Ispod saca");


                this.userRepository.save(waiter3);
                this.userRepository.save(cook3);
                this.userRepository.save(bartender3);
                //this.userRepository.save(supplier);

                List<Integer> tables3 = new ArrayList<>();
                tables3.add(5);
                tables3.add(6);
                tables3.add(7);
                tables3.add(8);
                tables3.add(9);

                List<Integer> tables4 = new ArrayList<>();
                tables4.add(1);
                tables4.add(2);
                tables4.add(3);
                tables4.add(4);

                User user3 = this.userRepository.findByEmail("prvi1@gmail.com");
                User user4 = this.userRepository.findByEmail("prvi2@gmail.com");
                SchedulerWork sw3 = new SchedulerWork(user3.getId(), "14:00:00", "22:00:00", tables3);
                SchedulerWork sw4 = new SchedulerWork(user4.getId(), "06:00:00", "14:00:00", tables4);
                this.schedulerWorkRepository.save(sw3);
                this.schedulerWorkRepository.save(sw4);

                /////////////////////CORSO/////////////////////////////

                Waiter waiter4 = new Waiter("Djura", "Djuric", "prvi3@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook4 = new Cook("Peca", "Pecic", "drugi3@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender4 = new Bartender("Mirko", "Mirkovic", "treci3@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter4.setStartTime("06:00");
                waiter4.setEndTime("14:00");
                waiter4.setRestaurantName("Corso");


                cook4.setStartTime("06:00");
                cook4.setEndTime("14:00");
                cook4.setRestaurantName("Corso");

                bartender4.setStartTime("06:00");
                bartender4.setEndTime("14:00");
                bartender4.setRestaurantName("Corso");


                this.userRepository.save(waiter4);
                this.userRepository.save(cook4);
                this.userRepository.save(bartender4);


                Waiter waiter5 = new Waiter("Ilija", "Ilic", "prvi4@gmail.com", "pass", Role.KONOBAR, date, 23, 45, false);
                Cook cook5 = new Cook("Dragan", "Jovic", "drugi4@gmail.com", "pass", Role.KUVAR, date, 23, 45, false);
                Bartender bartender5 = new Bartender("Dusan", "Dusic", "treci4@gmail.com", "pass", Role.SANKER, date, 23, 45, false);
                //Supplier supplier = new Supplier("Paja", "Patak", "paja@gmail.com", "pass", Role.PONUDJAC, date, false);

                waiter5.setStartTime("14:00");
                waiter5.setEndTime("22:00");
                waiter5.setRestaurantName("Corso");


                cook5.setStartTime("14:00");
                cook5.setEndTime("22:00");
                cook5.setRestaurantName("Corso");

                bartender5.setStartTime("14:00");
                bartender5.setEndTime("22:00");
                bartender5.setRestaurantName("Corso");


                this.userRepository.save(waiter5);
                this.userRepository.save(cook5);
                this.userRepository.save(bartender5);
                //this.userRepository.save(supplier);

                List<Integer> tables5 = new ArrayList<>();
                tables5.add(5);
                tables5.add(6);
                tables5.add(7);
                tables5.add(8);
                tables5.add(9);

                List<Integer> tables6 = new ArrayList<>();
                tables6.add(1);
                tables6.add(2);
                tables6.add(3);
                tables6.add(4);

                User user5 = this.userRepository.findByEmail("prvi3@gmail.com");
                User user6 = this.userRepository.findByEmail("prvi4@gmail.com");
                SchedulerWork sw5 = new SchedulerWork(user5.getId(), "14:00:00", "22:00:00", tables5);
                SchedulerWork sw6 = new SchedulerWork(user6.getId(), "06:00:00", "14:00:00", tables6);
                this.schedulerWorkRepository.save(sw5);
                this.schedulerWorkRepository.save(sw6);





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
