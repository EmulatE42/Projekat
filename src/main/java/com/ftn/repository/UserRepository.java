package com.ftn.repository;

import com.ftn.domain.Bartender;
import com.ftn.domain.Guest;
import com.ftn.domain.User;
import com.ftn.domain.Waiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

}
