package com.ftn.service;

import com.ftn.domain.Drink;
import com.ftn.domain.Food;
import com.ftn.domain.Order;

import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
public interface OrderService {
    Set<Food> getFoods();
    Set<Drink> getDrinks();
    Set<Order> getOrders();
    void saveOrder(Order order);

}
