package com.ftn.service;

import com.ftn.domain.OrderDrinkItem;

import java.util.List;

/**
 * Created by EmulatE on 22-Jun-17.
 */
public interface OrderDrinkItemService {
    OrderDrinkItem save(OrderDrinkItem f);
    List<OrderDrinkItem> getOrderDrinkItems();
}
