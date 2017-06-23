package com.ftn.repository;

import com.ftn.domain.OrderFoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface OrderFoodItemRepository extends JpaRepository<OrderFoodItem, Integer> {
    // za save ne ali za getAll pa poslednji da :D
}
