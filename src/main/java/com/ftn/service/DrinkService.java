package com.ftn.service;

import com.ftn.domain.Drink;
import com.ftn.domain.Food;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface DrinkService {
    Drink save(Drink f);
    List<Drink> getDrinks();
}
