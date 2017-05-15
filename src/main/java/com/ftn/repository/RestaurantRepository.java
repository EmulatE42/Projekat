package com.ftn.repository;

import com.ftn.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by Momir on 5/14/2017.
 */
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{

    @Query("SELECT r FROM Restaurant r")
    List<Restaurant> getAll();
}
