package com.ftn.repository;

import com.ftn.domain.Food;
import com.ftn.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface FoodRepository  extends JpaRepository<Food, Integer> {
}
