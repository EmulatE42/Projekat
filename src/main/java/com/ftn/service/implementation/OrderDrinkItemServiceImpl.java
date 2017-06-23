package com.ftn.service.implementation;

import com.ftn.domain.OrderDrinkItem;
import com.ftn.repository.OrderDrinkItemRepository;
import com.ftn.service.OrderDrinkItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@Service
public class OrderDrinkItemServiceImpl implements OrderDrinkItemService {

    @Autowired
    private OrderDrinkItemRepository orderDrinkItemRepository;

    @Override
    public OrderDrinkItem save(OrderDrinkItem f) {
        return orderDrinkItemRepository.save(f);
    }

    @Override
    public List<OrderDrinkItem> getOrderDrinkItems() {
        List<OrderDrinkItem> odis = orderDrinkItemRepository.getAll();
        return odis;
    }
}
