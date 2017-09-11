package com.ftn.sw41.domain;

import com.ftn.domain.Order;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.assertEquals;

/**
 * Created by Momir on 11.09.2017.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrderTest {

    Order order;

    @Before
    public void setUp() {
        order = new Order(null, null, null, "Aman", "12.09.2017. 10:00 11:00");
    }

    @Test
    public void testOrderRestaurantName() {
        assertEquals("Aman", order.getNazivRestorana());
    }

    @Test
    public void testOrderTime() {
        assertEquals("12.09.2017. 10:00 11:00", order.getVreme());
    }
}
