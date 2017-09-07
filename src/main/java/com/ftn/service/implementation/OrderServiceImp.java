package com.ftn.service.implementation;

import com.ftn.domain.Drink;
import com.ftn.domain.Food;
import com.ftn.domain.Order;
import com.ftn.repository.OrderRepository;
import com.ftn.repository.UserRepository;
import com.ftn.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Momir on 6/20/2017.
 */
@Service
public class OrderServiceImp implements OrderService {


    @Autowired
    private OrderRepository orderRepository;

    @Override
    public void updateOrderReady(int id) {
        orderRepository.updateReady(id);
    }

    @Override
    public void updateOrderAccept(int id) {
        orderRepository.updateAccept(id);
    }

    @Override
    public Integer getMaxId() {
        return orderRepository.getMaxId();
    }

    @Override
    public Order dajIdJBt(Integer id) {
        return  orderRepository.dajIdJBt(id);
    }

    @Override
    public Set<Food> getFoods() {
        Set<Food> foods = new HashSet<>();
        Food f1 = new Food("Karadjordjeva snicla", "jako dobra stvar", 1500);
        Food f2 = new Food("Pasulj", "jako dobra stvar", 1500);
        foods.add(f1);
        foods.add(f2);
        return foods;
    }

    @Override
    public Set<Drink> getDrinks() {
        Set<Drink> drinks = new HashSet<>();
        Drink f1 = new Drink("Vodka martini", "jako dobra stvar", 1500);
        Drink f2 = new Drink("Rogonja", "jako dobra stvar", 150);
        drinks.add(f1);
        drinks.add(f2);
        return drinks;
    }

    @Override
    public Set<Order> getOrders()
    {
        return orderRepository.getOrders();
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }
}
