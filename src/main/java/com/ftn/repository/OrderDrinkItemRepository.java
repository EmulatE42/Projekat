package com.ftn.repository;

import com.ftn.domain.OrderDrinkItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface OrderDrinkItemRepository extends JpaRepository<OrderDrinkItem, Integer> {
    @Query("SELECT r FROM OrderDrinkItem r")
    List<OrderDrinkItem> getAll();
    // za save ne ali za getAll pa poslednji da :D
}
