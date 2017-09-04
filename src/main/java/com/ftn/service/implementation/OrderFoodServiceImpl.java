package com.ftn.service.implementation;

import com.ftn.domain.Order_Food;
import com.ftn.repository.OrderFoodRepository;
import com.ftn.repository.OrderRepository;
import com.ftn.service.OrderFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 03.09.2017.
 */
@Service
public class OrderFoodServiceImpl implements OrderFoodService {

    @Autowired
    private OrderFoodRepository  orderFoodRepository;

    @Override
    public List<Order_Food> getOrderFoods() {
        return orderFoodRepository.findAll();
    }

    @Override
    public void save(Order_Food order_food) {
        this.orderFoodRepository.save(order_food);
    }

    @Override
    public void updateReady(int id) {
        orderFoodRepository.updateReady(id);
    }

    @Override
    public void updateAccept(int id) {
        orderFoodRepository.updateAccept(id);
    }
}
