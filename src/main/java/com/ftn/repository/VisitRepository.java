package com.ftn.repository;

import com.ftn.domain.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by EmulatE on 23-Jun-17.
 */
public interface VisitRepository extends JpaRepository<Visit, Integer> {

    @Query("SELECT f FROM Visit f WHERE f.email = :email")
    List<Visit> findVisitsByEmail(@Param("email") String email);

}
