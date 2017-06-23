package com.ftn.service.implementation;

import com.ftn.domain.Drink;
import com.ftn.repository.DrinkRepository;
import com.ftn.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@Service
public class DrinkServiceImpl  implements DrinkService{ // ne gledaj ni ovo ni food
    @Autowired
    DrinkRepository drinkRepository;
    @Override
    public Drink save(Drink f) {
        return drinkRepository.save(f);
    }


    @Override
    public List<Drink> getDrinks() {
        List<Drink> u = drinkRepository.findAll();

        return u;

    }

}
