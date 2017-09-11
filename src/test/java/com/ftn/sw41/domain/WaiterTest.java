package com.ftn.sw41.domain;

import com.ftn.domain.Order;
import com.ftn.domain.Role;
import com.ftn.domain.Waiter;
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
public class WaiterTest {

    Waiter waiter;

    @Before
    public void setUp() {
        waiter = new Waiter("Ilija", "Ilic", "ilija@gmail.com", "pass", Role.KONOBAR, null, 23, 45, false);
    }
    //String first_name, String last_name, String email, String password, Role role, Date birth, int dressSize, int shoeSize, boolean firstTimeLogin

    @Test
    public void testWaiterFirstname() {
        assertEquals("Ilija", waiter.getFirst_name());
    }

    @Test
    public void testWaiterLastname() {
        assertEquals("Ilic", waiter.getLast_name());
    }

    @Test
    public void testWaiterEmail() {
        assertEquals("ilija@gmail.com", waiter.getEmail());
    }
}
