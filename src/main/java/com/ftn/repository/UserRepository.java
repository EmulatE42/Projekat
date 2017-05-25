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
    User findById(int id); // MOMIRE OVO MORA DA VRATI USERA PA SE ONDA KASTUJES U ONOG KO TI TREBA NE MOZE DA FIKSIRAS ZA WAITERA SAMO

    @Query("SELECT w FROM Waiter w")
    List<Waiter> getWaiters();

    @Query("SELECT w FROM Waiter w WHERE w.first_name = :first_name")
    Waiter getWaiter(@Param("first_name") String first_name);


    @Query("SELECT c FROM Cook c WHERE c.id = :id")
    Cook getCook( @Param("id") int id);

    @Query("SELECT b FROM Bartender b WHERE b.id = :id")
    Bartender getBartender(@Param("id") int id);

    @Query("SELECT g FROM Guest g WHERE g.id = :id")
    Guest getGuest(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query("Update Guest g SET g.email=:email, g.password = :password WHERE g.email=:email")
    void updateGuestPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT c FROM Supplier c WHERE c.id = :id")
    Supplier getSupplier( @Param("id") int id);

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
    @Query("Update Supplier b SET b.email=:email, b.password = :password, b.firstTimeLogin = true WHERE b.email=:email")
    void updateSupplierPassword(@Param("email") String email, @Param("password") String password);

    @Modifying
    @Transactional
    @Query("Update Waiter w SET w.first_name=:first_name, w.last_name = :last_name, w.avatar = :avatar, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateWaiter(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("avatar") String avatar, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

    @Modifying
    @Transactional
    @Query("Update Cook w SET w.first_name=:first_name, w.last_name = :last_name, w.avatar = :avatar, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateCook(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("avatar") String avatar, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

    @Modifying
    @Transactional
    @Query("Update Bartender w SET w.first_name=:first_name, w.last_name = :last_name, w.avatar = :avatar, w.birth = :birth, w.dressSize = :dressSize, w.shoeSize = :shoeSize WHERE w.id=:id")
    void updateBartender(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("avatar") String avatar, @Param("birth") Date birth, @Param("dressSize") int dressSize, @Param("shoeSize") int shoeSize);

    @Modifying
    @Transactional
    @Query("Update Guest g SET g.first_name=:first_name, g.last_name = :last_name, g.avatar = :avatar, g.adresa = :adresa WHERE g.id=:id")
    void updateGuest(@Param("id") Integer id,@Param("first_name") String first_name, @Param("last_name") String last_name, @Param("avatar") String avatar,@Param("adresa") String adresa);


    @Modifying
    @Transactional
    @Query("Update Supplier w SET w.first_name=:first_name, w.last_name = :last_name, w.avatar = :avatar, w.birth = :birth WHERE w.id=:id")
    void updateSupplier(@Param("id") int id, @Param("first_name") String first_name, @Param("last_name") String last_name, @Param("avatar") String avatar, @Param("birth") Date birth);

}
