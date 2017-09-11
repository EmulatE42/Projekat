package com.ftn.sw41.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.ftn.domain.Order;
import com.ftn.domain.Order_Drink;
import com.ftn.repository.OrderDrinkRepository;
import com.ftn.repository.OrderRepository;
import com.ftn.service.OrderDrinkService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Momir on 12.09.2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrderRepositoryIntegrationTests {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDrinkRepository orderDrinkRepository;

    @Test
    public void executesQueryMethodsCorrectly() {

        Order order = this.orderRepository
                .findAll(new PageRequest(0, 1, Sort.Direction.ASC, "nazivRestorana")).getContent()
                .get(0);
        assertThat(order.getNazivRestorana()).isEqualTo("Aman");


    }



}
