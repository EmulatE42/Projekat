package com.ftn.service.implementation;

import com.ftn.domain.OrderFoodItem;
import com.ftn.repository.OrderFoodItemRepository;
import com.ftn.service.OrderFoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by EmulatE on 22-Jun-17.
 */
@Service
public class OrderFoodItemServiceImpl implements OrderFoodItemService {
    @Autowired
    private OrderFoodItemRepository orderFoodItemRepository;

    @Override
    public OrderFoodItem save(OrderFoodItem f) {
        return orderFoodItemRepository.save(f);
    }
}
