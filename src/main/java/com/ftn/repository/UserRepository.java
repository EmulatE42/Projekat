package com.ftn.repository;

import com.ftn.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by EmulatE on 10-May-17.
 */
public interface UserRepository extends JpaRepository<User,Integer> {
    User findAllByEmailAndPassword(String email, String password);
    User findByEmail(String email);
    Integer deleteUserByEmail(String email);

    @Query("SELECT w FROM Waiter w")
    List<Waiter> getWaiters();

    @Query("SELECT w FROM Waiter w WHERE w.first_name = :first_name")
    Waiter getWaiter(@Param("first_name") String first_name);

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

}
