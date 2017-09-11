package com.ftn.sw41.domain;

import com.ftn.domain.Bartender;
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
public class BartenderTest {
    Bartender bartender;

    @Before
    public void setUp() {
        bartender = new Bartender("Vitez", "Koja", "koja@gmail.com", "pass", Role.SANKER, null, 23, 45, false);
    }

    @Test
    public void testBartenderFirstname() {
        assertEquals("Vitez", bartender.getFirst_name());
    }

    @Test
    public void testBartenderLastname() {
        assertEquals("Koja", bartender.getLast_name());
    }

    @Test
    public void testBartenderEmail() {
        assertEquals("koja@gmail.com", bartender.getEmail());
    }
}
