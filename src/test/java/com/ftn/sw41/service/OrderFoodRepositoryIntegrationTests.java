package com.ftn.sw41.service;

import com.ftn.domain.Order;
import com.ftn.domain.Order_Food;
import com.ftn.repository.OrderDrinkRepository;
import com.ftn.repository.OrderFoodRepository;
import com.ftn.repository.OrderRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

/**
 * Created by Momir on 12.09.2017.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrderFoodRepositoryIntegrationTests {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderFoodRepository orderFoodRepository;

    @Test
    public void executesQueryMethodsCorrectly() {

        Order_Food order_food = this.orderFoodRepository
                .findAll(new PageRequest(0, 1, Sort.Direction.ASC, "food_id")).getContent()
                .get(0);

        Order order = this.orderRepository.findById(order_food.getOrder().getId());

        assertNotEquals(order, null);
        assertThat(order).isEqualTo(order_food.getOrder());


    }

}
