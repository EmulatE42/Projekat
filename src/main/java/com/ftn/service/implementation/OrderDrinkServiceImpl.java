package com.ftn.service.implementation;

import com.ftn.domain.Order_Drink;
import com.ftn.repository.OrderDrinkRepository;
import com.ftn.service.OrderDrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Momir on 03.09.2017.
 */
@Service
public class OrderDrinkServiceImpl implements OrderDrinkService {

    @Autowired
    private OrderDrinkRepository orderDrinkRepository;

    @Override
    public List<Order_Drink> getOrderDrinks() {
        return this.orderDrinkRepository.findAll();
    }

    @Override
    public void save(Order_Drink order_drink) {
        this.orderDrinkRepository.save(order_drink);
    }

    @Override
    public void updateReady(int id) {
        orderDrinkRepository.updateReady(id);
    }

    @Override
    public void delteOrderDrinks(int id) {
        orderDrinkRepository.delete(id);
    }
}
