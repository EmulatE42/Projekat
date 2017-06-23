package com.ftn.repository;

import com.ftn.domain.Drink;
import com.ftn.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface DrinkRepository extends JpaRepository<Drink, Integer> {
}
