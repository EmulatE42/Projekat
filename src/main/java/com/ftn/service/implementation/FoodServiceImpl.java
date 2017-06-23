package com.ftn.service.implementation;

import com.ftn.domain.Food;
import com.ftn.repository.FoodRepository;
import com.ftn.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@Service
public class FoodServiceImpl  implements FoodService{ // ne gledaj ni ovo ni food

    @Autowired
    FoodRepository foodRepository;
    @Override
    public Food save(Food f) {
        return foodRepository.save(f);
    }


    @Override
    public List<Food> getFoods() {
        List<Food> u = foodRepository.findAll();

        return u;

    }

}
