package com.ftn.sw41.domain;

import com.ftn.domain.Cook;
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
public class CookTest {

    Cook cook;

    @Before
    public void setUp() {
        cook = new Cook("Dalibor", "Jovanovic", "dalibor@gmail.com", "pass", Role.KUVAR, null, 23, 45, false);
    }

    @Test
    public void testCookFirstname() {
        assertEquals("Dalibor", cook.getFirst_name());
    }

    @Test
    public void testCookLastname() {
        assertEquals("Jovanovic", cook.getLast_name());
    }

    @Test
    public void testCookEmail() {
        assertEquals("dalibor@gmail.com", cook.getEmail());
    }
}
