package com.ftn.service;

import com.ftn.domain.*;

import java.util.Date;

/**
 * Created by EmulatE on 10-May-17.
 */
public interface UserService {
 // ovde su moje u rep su postojece kom
    //User findOne(Integer id);
    Guest save(Guest guest);
    User findByEmail(String email);
    Integer deleteUserByEmail(String email);
    User login(String email, String password);
    Guest register(String firstname, String lastname, String email, String password);
    User updateGuestPassword(String email, String password);
    User updateWaiterPassword(String email, String password);
    User updateCookPassword(String email, String password);
    User updateBartenderPassword(String email, String password);
    User updateSupplierPassword(String email, String password);
    Waiter updateWaiter(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize);
    Cook updateCook(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize);
    Bartender updateBartender(int id, String firstname, String lastname, String avatar, Date birth, int dressSize, int shoeSize);
    Supplier updateSupplier(int id, String firstname, String lastname, String avatar, Date birth);


    Guest updateGuest(Integer id, String first_name, String last_name, String avatar, String adresa);
}
