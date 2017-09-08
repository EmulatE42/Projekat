package com.ftn.service;

import com.ftn.domain.Order_Drink;

import java.util.List;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderDrinkService {
    List<Order_Drink> getOrderDrinks();
    void save(Order_Drink order_drink);
    void updateReady(int id);
    void delteOrderDrinks(int id);
}
