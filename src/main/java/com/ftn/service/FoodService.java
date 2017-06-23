package com.ftn.service;

import com.ftn.domain.Food;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface FoodService {
    Food save(Food f);
    List<Food> getFoods();
}
