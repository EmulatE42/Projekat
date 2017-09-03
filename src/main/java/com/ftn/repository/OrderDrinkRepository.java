package com.ftn.repository;

import com.ftn.domain.Order_Drink;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderDrinkRepository extends JpaRepository<Order_Drink, Integer> {

}
