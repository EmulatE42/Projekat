package com.ftn.service;

import com.ftn.domain.Order_Food;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 03.09.2017.
 */
public interface OrderFoodService {
    List<Order_Food> getOrderFoods();
    void save(Order_Food order_food);
}
