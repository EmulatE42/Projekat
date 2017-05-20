package com.ftn.repository;

import com.ftn.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by EmulatE on 10-May-17.
 */
public interface UserRepository extends JpaRepository<User,Integer> {
    User findAllByEmailAndPassword(String email, String password);
    User findByEmail(String email);
    Integer deleteUserByEmail(String email);
    Waiter findById(int id);

    @Query("SELECT w FROM Waiter w")
    List<Waiter> getWaiters();

    @Query("SELECT w FROM Waiter w WHERE w.first_name = :first_name")
    Waiter getWaiter(@Param("first_name") String first_name);


    @Query("SELECT c FROM Cook c WHERE c.id = :id")
    Cook getCook( @Param("id") int id);

    @Query("SELECT b FROM Bartender b WHERE b.id = :id")
    Bartender getBartender(@Param("id") int id);

    @Modifying
    @Transactional
    @Query("Update Waiter w SET w.email=:email, w.password = :password, w.firstTimeLogin = true WHERE w.email=:email")
    void updateWaiterPassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("Update Cook c SET c.email=:email, c.password = :password, c.firstTimeLogin = true WHERE c.email=:email")
    void updateCookPassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("Update Bartender b SET b.email=:email, b.password = :password, b.firstTimeLogin = true WHERE b.email=:email")
    void updateBartenderPassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("Update Waiter w SET w.first_name=:first_name, w.last_name = :last_name, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateWaiter(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

    @Modifying
    @Transactional
    @Query("Update Cook w SET w.first_name=:first_name, w.last_name = :last_name, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateCook(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

    @Modifying
    @Transactional
    @Query("Update Bartender w SET w.first_name=:first_name, w.last_name = :last_name, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateBartender(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

}
