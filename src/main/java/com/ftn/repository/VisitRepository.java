package com.ftn.repository;

import com.ftn.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EmulatE on 23-Jun-17.
 */
public interface VisitRepository extends JpaRepository<Visit, Integer> {

    @Query("SELECT f FROM Visit f WHERE f.email = :email")
    List<Visit> findVisitsByEmail(@Param("email") String email);
    @Query("SELECT r FROM Visit r")
    List<Visit> getAll();

    @Modifying
    @Transactional
    @Query("Update Visit v SET v.ocena= :ocena , v.gotov = 1 WHERE v.id=:id")
    void updateVisit(@Param("id") int id,@Param("ocena") double ocena);


}
